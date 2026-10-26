/* ===== js/backup.js ===== */
/*
 * backup.js — Human-readable JSON export/import.
 * Converts the flat internal db shape to/from the nested, hand-editable
 * tree format described in docs/BACKUP_FORMAT.md, and drives the actual
 * file download/upload.
 */

/* ---------------- Backup: export / import to a .json file ----------------
   Since data lives only in this browser's local storage, exporting a backup
   file lets the user move it to another browser/computer or protect against
   clearing browser data.
   The export uses a nested, human-readable structure (departments -> elements
   -> instances -> informacje) with Polish field names and indentation, so the
   file can be opened and edited by hand — order in each array is the order
   shown in the app, and photos are always the last field so text is easy to
   scan. Import also accepts the old flat format from earlier versions. */

/* Technological notes <-> readable JSON.
 *   "rodzaj": "ogolna"    -> nazwa, opis, data
 *   "rodzaj": "tworzenie" -> srednica, opis, klient, za, data
 *   "rodzaj": "instrukcja" -> opis, data (Instrukcja ogólna, max. jedna)
 * Files exported before kinds existed have neither "rodzaj" nor "data":
 * they import as general notes without a date. */
function noteToExport(note){
  if(note.kind === NOTE_KIND_INSTRUCTION){
    return { rodzaj: 'instrukcja', opis: note.description || '', ...exportedLinks(note), data: note.date || null };
  }
  if(note.kind === NOTE_KIND_CREATION){
    return {
      rodzaj: 'tworzenie',
      srednica: note.diameter,
      opis: note.description || '',
      klient: note.client || '',
      za: note.za || '',
      ...exportedLinks(note),
      data: note.date || null
    };
  }
  return {
    rodzaj: 'ogolna',
    nazwa: note.name || '',
    opis: note.description || '',
    ...exportedLinks(note),
    data: note.date || null
  };
}

/* "odnosniki": [{ typ: dzial|element|instancja|grupa, sciezka: [nazwy...] }] - only when present. */
function exportedLinks(note){
  const links = linksToExport(note.links);
  return links.length ? { odnosniki: links } : {};
}

function noteFromImport(node, scope, ownerId){
  const s = NOTE_SCOPES[scope];
  const note = {
    id: uid(s.idPrefix),
    [s.ownerKey]: ownerId,
    description: node.opis || '',
    date: node.data || ''
  };
  if(node.rodzaj === 'instrukcja'){
    note.kind = NOTE_KIND_INSTRUCTION;
  } else if(node.rodzaj === 'tworzenie'){
    const diameter = parseDiameter(node.srednica);
    note.kind = NOTE_KIND_CREATION;
    note.diameter = isNaN(diameter) ? 0 : diameter;
    note.client = node.klient || '';
    note.za = node.za || '';
  } else {
    note.kind = NOTE_KIND_GENERAL;
    note.name = node.nazwa || '';
  }
  if(Array.isArray(node.odnosniki)) note._links = node.odnosniki; // resolved once everything is imported
  return note;
}

/* Builds the nested tree object from the current in-memory db + photo/file
 * caches, WITHOUT triggering a file download. Used by exportBackup() below,
 * and reused as-is by storage.server.js's saveData() when the app is wired
 * to the Python/SQL Server backend instead of local IndexedDB — that's the
 * only reason this is a separate function rather than inlined. */
async function buildExportTree(){
  const elementPhotosMap = {};
  for(const el of db.elements){
    const p = await loadPhotos(el.id);
    elementPhotosMap[el.id] = p || [];
  }
  const instancePhotosMap = {};
  for(const inst of db.instances){
    const p = await loadInstancePhotos(inst.id);
    instancePhotosMap[inst.id] = p || [];
  }
  const elementFilesMap = {};
  for(const el of db.elements){
    const f = await loadElementFiles(el.id);
    elementFilesMap[el.id] = f || [];
  }
  const instanceFilesMap = {};
  for(const inst of db.instances){
    const f = await loadInstanceFiles(inst.id);
    instanceFilesMap[inst.id] = f || [];
  }

  return {
    eksport: new Date().toISOString(),
    format: 'baza-wiedzy-produkcyjnej-v3',
    grupyInformacji: db.techGroups.map(g => ({
      nazwa: g.name,
      informacje: techInfosOf(g.id).map(info => ({
        nazwa: info.name,
        opis: info.description || '',
        opcjonalna: !!info.optional
      })),
      tabele: techTablesOf(g.id).map(t => ({
        nazwa: t.name,
        tabela: {
          wiersze: t.table.rows,
          scaloneKomorki: (t.table.merges || []).map(m => ({ wiersz: m.r, kolumna: m.c, wierszy: m.rs, kolumn: m.cs })),
          szerokosciKolumn: t.table.widths || [],
          naglowekWiersze: headerRowCount(t.table)
        },
        data: t.date || null
      }))
    })),
    dzialy: db.departments.map(dept => ({
      nazwa: dept.name,
      zdjecie: dept.photo || null,
      elementy: elementsOf(dept.id).map(el => ({
        nazwa: el.name,
        informacjeOgolne: elementInfosOf(el.id).map(info => ({
          nazwa: info.name,
          opis: info.description || '',
          opcjonalna: !!info.optional
        })),
        uwagiTechnologiczne: notesOf('element', el.id).map(noteToExport),
        instancje: instancesOf(el.id).map(inst => ({
          nazwa: inst.name,
          indeks: inst.index || '',
          numerWinKlima: inst.winklima || '',
          skrot: inst.skrot || '',
          informacje: infosOf(inst.id).map(info => ({
            typ: info.type==='process' ? 'proces' : 'informacja',
            nazwa: info.name,
            opis: info.description || '',
            opcjonalna: !!info.optional,
            zdjecie: info.photo || null
          })),
          uwagiTechnologiczne: notesOf('instance', inst.id).map(noteToExport),
          zalaczniki: (instanceFilesMap[inst.id] || []).map(f => ({
            nazwaPliku: f.name, typ: f.type || '', rozmiar: f.size || 0, dane: f.dataUrl
          })),
          zdjecia: instancePhotosMap[inst.id] || []
        })),
        zalaczniki: (elementFilesMap[el.id] || []).map(f => ({
          nazwaPliku: f.name, typ: f.type || '', rozmiar: f.size || 0, dane: f.dataUrl
        })),
        zdjecia: elementPhotosMap[el.id] || []
      }))
    }))
  };
}

async function exportBackup(){
  const tree = await buildExportTree();

  const blob = new Blob([JSON.stringify(tree, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0,10);
  a.href = url;
  a.download = `baza-wiedzy-produkcyjnej-kopia-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast('Kopia zapasowa pobrana.');
}

/* Converts the readable nested tree (from exportBackup, or hand-edited by the
   user) into the flat internal db shape, generating fresh internal ids. */
function nestedTreeToDb(tree){
  const newDb = { departments:[], elements:[], instances:[], informations:[], elementInformations:[], elementNotes:[], instanceNotes:[], techGroups:[], techInfos:[], techTables:[] };
  const elementPhotos = {};
  const instancePhotos = {};
  const elementFiles = {};
  const instanceFiles = {};

  for(const deptNode of (tree.dzialy || [])){
    const dept = { id: uid('dept'), name: (deptNode.nazwa || 'Dział bez nazwy') };
    if(deptNode.zdjecie) dept.photo = deptNode.zdjecie;
    newDb.departments.push(dept);

    for(const elNode of (deptNode.elementy || [])){
      const el = { id: uid('el'), departmentId: dept.id, name: (elNode.nazwa || 'Element bez nazwy') };
      newDb.elements.push(el);

      if(Array.isArray(elNode.zdjecia) && elNode.zdjecia.length){
        elementPhotos[el.id] = elNode.zdjecia;
      }

      if(Array.isArray(elNode.zalaczniki) && elNode.zalaczniki.length){
        elementFiles[el.id] = elNode.zalaczniki.map(f => ({
          id: uid('file'), name: f.nazwaPliku || 'plik', type: f.typ || '', size: f.rozmiar || 0, dataUrl: f.dane || ''
        }));
      }

      for(const infoNode of (elNode.informacjeOgolne || [])){
        newDb.elementInformations.push({
          id: uid('elinfo'),
          elementId: el.id,
          name: infoNode.nazwa || '',
          description: infoNode.opis || '',
          optional: !!infoNode.opcjonalna
        });
      }

      for(const noteNode of (elNode.uwagiTechnologiczne || [])){
        newDb.elementNotes.push(noteFromImport(noteNode, 'element', el.id));
      }

      for(const instNode of (elNode.instancje || [])){
        const inst = { id: uid('inst'), elementId: el.id, name: (instNode.nazwa || 'Instancja bez nazwy'), index: instNode.indeks || '', winklima: instNode.numerWinKlima || '', skrot: instNode.skrot || '' };
        newDb.instances.push(inst);

        if(Array.isArray(instNode.zdjecia) && instNode.zdjecia.length){
          instancePhotos[inst.id] = instNode.zdjecia;
        }

        if(Array.isArray(instNode.zalaczniki) && instNode.zalaczniki.length){
          instanceFiles[inst.id] = instNode.zalaczniki.map(f => ({
            id: uid('file'), name: f.nazwaPliku || 'plik', type: f.typ || '', size: f.rozmiar || 0, dataUrl: f.dane || ''
          }));
        }

        for(const infoNode of (instNode.informacje || [])){
          const newInfo = {
            id: uid('info'),
            instanceId: inst.id,
            name: infoNode.nazwa || '',
            description: infoNode.opis || '',
            optional: !!infoNode.opcjonalna,
            type: infoNode.typ==='proces' ? 'process' : 'info'
          };
          if(infoNode.zdjecie) newInfo.photo = infoNode.zdjecie;
          newDb.informations.push(newInfo);
        }

        for(const noteNode of (instNode.uwagiTechnologiczne || [])){
          newDb.instanceNotes.push(noteFromImport(noteNode, 'instance', inst.id));
        }
      }
    }
  }

  for(const groupNode of (tree.grupyInformacji || [])){
    const group = { id: uid('tgrp'), name: (groupNode.nazwa || 'Grupa bez nazwy') };
    newDb.techGroups.push(group);
    for(const infoNode of (groupNode.informacje || [])){
      newDb.techInfos.push({
        id: uid('tinfo'),
        groupId: group.id,
        name: infoNode.nazwa || '',
        description: infoNode.opis || '',
        optional: !!infoNode.opcjonalna
      });
    }
    for(const tableNode of (groupNode.tabele || [])){
      newDb.techTables.push({
        id: uid('ttab'),
        groupId: group.id,
        name: tableNode.nazwa || '',
        table: tableFromImport(tableNode.tabela),
        date: tableNode.data || ''
      });
    }
  }

  resolveImportedLinks(newDb);
  newDb.elementNotes = keepSingleInstruction(newDb.elementNotes, 'elementId');
  newDb.instanceNotes = keepSingleInstruction(newDb.instanceNotes, 'instanceId');

  return { newDb, elementPhotos, instancePhotos, elementFiles, instanceFiles };
}

async function applyImportedData(newDb, elementPhotos, instancePhotos, elementFiles, instanceFiles){
  try{
    await apiRequest('/import', {
      method: 'POST',
      body: {
        db: newDb,
        photos: elementPhotos || {},
        instancePhotos: instancePhotos || {},
        elementFiles: elementFiles || {},
        instanceFiles: instanceFiles || {}
      }
    });
    await loadData();
  }catch(e){
    showToast('Nie udało się zaimportować danych na serwer.');
    return;
  }
  showToast('Dane zaimportowane.');
  sidePanelLink = null;
  commitNav([{view:'departments'}]);
}

function importBackup(file){
  const reader = new FileReader();
  reader.onload = async (e)=>{
    try{
      const payload = JSON.parse(e.target.result);
      if(!payload || (typeof payload !== 'object')) throw new Error('bad-file');

      if(Array.isArray(payload.dzialy)){
        // current, human-readable nested format
        const { newDb, elementPhotos, instancePhotos, elementFiles, instanceFiles } = nestedTreeToDb(payload);
        confirmDelete('Import zastąpi wszystkie obecne dane na serwerze danymi z pliku kopii zapasowej. Kontynuować?', ()=>{
          applyImportedData(newDb, elementPhotos, instancePhotos, elementFiles, instanceFiles);
        });
      } else if(payload.db){
        // older flat format, kept for backward compatibility
        confirmDelete('Import zastąpi wszystkie obecne dane na serwerze danymi z pliku kopii zapasowej. Kontynuować?', ()=>{
          applyImportedData(payload.db, payload.photos || {}, payload.instancePhotos || {}, {}, {});
        });
      } else {
        throw new Error('bad-file');
      }
    }catch(err){
      showToast('Nie udało się wczytać pliku kopii zapasowej.');
    }
  };
  reader.readAsText(file);
}
