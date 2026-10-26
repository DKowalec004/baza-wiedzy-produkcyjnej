'use strict';

/**
 * Wczytuje kopię JSON aplikacji jednoplikowej, zapisuje zdjęcia / tabele
 * do folderów roboczych, tworzy data/state.json oraz schema/seed.sql.
 * Jeśli MSSQL jest skonfigurowany i dostępny — wstawia dane do bazy.
 */

const fs = require('fs');
const path = require('path');

const config = require('../server/config');
const files = require('../server/files');
const { emptyDb, uid } = require('../server/store/helpers');
const jsonStore = require('../server/store/json-store');

const BACKUP = config.backupFile;

function sqlStr(value) {
  if (value == null) return 'NULL';
  return 'N\'' + String(value).replace(/'/g, '\'\'') + '\'';
}

function sqlDate(value) {
  if (!value) return 'NULL';
  return sqlStr(value);
}

function sqlNum(value) {
  return value == null || value === '' ? 'NULL' : String(Number(value));
}

function parseDiameter(text) {
  const s = String(text == null ? '' : text).trim().replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(s)) return null;
  const n = parseFloat(s);
  return n > 0 ? n : null;
}

function tableFromImport(t) {
  t = t || {};
  let rows = (Array.isArray(t.wiersze) ? t.wiersze : [])
    .map((r) => (Array.isArray(r) ? r : []).map((c) => String(c == null ? '' : c)));
  const nCols = rows.reduce((m, r) => Math.max(m, r.length), 0);
  rows = rows.map((r) => {
    while (r.length < nCols) r.push('');
    return r;
  });
  const merges = (Array.isArray(t.scaloneKomorki) ? t.scaloneKomorki : [])
    .map((m) => ({ r: +m.wiersz, c: +m.kolumna, rs: +m.wierszy, cs: +m.kolumn }))
    .filter((m) => [m.r, m.c, m.rs, m.cs].every(Number.isInteger));
  const widths = Array.from({ length: nCols }, (_, c) => {
    const w = +(t.szerokosciKolumn || [])[c];
    return w > 0 ? Math.min(w, 60) : 0;
  });
  const hr = Number.isInteger(t.naglowekWiersze) && t.naglowekWiersze >= 0
    ? Math.min(t.naglowekWiersze, rows.length)
    : 1;
  return { rows, merges, widths, headerRows: hr };
}

function noteFromImport(node, scope, ownerId) {
  const note = {
    id: uid(scope === 'element' ? 'elnote' : 'instnote'),
    [scope === 'element' ? 'elementId' : 'instanceId']: ownerId,
    description: node.opis || '',
    date: node.data || '',
    links: []
  };
  if (node.rodzaj === 'instrukcja') note.kind = 'instruction';
  else if (node.rodzaj === 'tworzenie') {
    note.kind = 'creation';
    note.diameter = parseDiameter(node.srednica) || 0;
    note.client = node.klient || '';
    note.za = node.za || '';
  } else {
    note.kind = 'general';
    note.name = node.nazwa || '';
  }
  note._paths = Array.isArray(node.odnosniki) ? node.odnosniki : [];
  return note;
}

function persistPhoto(id, dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string') return null;
  if (!dataUrl.startsWith('data:')) return dataUrl;
  return files.saveDataUrl('photos', id, dataUrl).url;
}

function persistFile(id, node) {
  if (!node || !node.dane) return null;
  const saved = files.saveDataUrl('attachments', id, node.dane, node.nazwaPliku);
  return {
    id,
    name: node.nazwaPliku || saved.fileName,
    type: node.typ || saved.mime || '',
    size: node.rozmiar || saved.size || 0,
    fileName: saved.fileName,
    url: saved.url,
    dataUrl: saved.url
  };
}

function nestedTreeToState(tree) {
  const db = emptyDb();
  const photos = {};
  const instancePhotos = {};
  const elementFiles = {};
  const instanceFiles = {};
  const nameIndex = { departments: {}, elements: {}, instances: {}, groups: {} };

  for (const deptNode of tree.dzialy || []) {
    const dept = { id: uid('dept'), name: deptNode.nazwa || 'Dział bez nazwy' };
    const photo = persistPhoto('deptphoto_' + dept.id, deptNode.zdjecie);
    if (photo) dept.photo = photo;
    db.departments.push(dept);
    nameIndex.departments[dept.name] = dept.id;

    for (const elNode of deptNode.elementy || []) {
      const el = { id: uid('el'), departmentId: dept.id, name: elNode.nazwa || 'Element bez nazwy' };
      db.elements.push(el);
      nameIndex.elements[dept.name + '/' + el.name] = el.id;

      if (Array.isArray(elNode.zdjecia) && elNode.zdjecia.length) {
        photos[el.id] = elNode.zdjecia.map((src, i) => persistPhoto(`el_${el.id}_${i}`, src)).filter(Boolean);
      }
      if (Array.isArray(elNode.zalaczniki) && elNode.zalaczniki.length) {
        elementFiles[el.id] = elNode.zalaczniki.map((f, i) => persistFile(`elfile_${el.id}_${i}`, f)).filter(Boolean);
      }
      for (const infoNode of elNode.informacjeOgolne || []) {
        db.elementInformations.push({
          id: uid('elinfo'),
          elementId: el.id,
          name: infoNode.nazwa || '',
          description: infoNode.opis || '',
          optional: !!infoNode.opcjonalna
        });
      }
      for (const noteNode of elNode.uwagiTechnologiczne || []) {
        db.elementNotes.push(noteFromImport(noteNode, 'element', el.id));
      }
      for (const instNode of elNode.instancje || []) {
        const inst = {
          id: uid('inst'),
          elementId: el.id,
          name: instNode.nazwa || 'Instancja bez nazwy',
          index: instNode.indeks || '',
          winklima: instNode.numerWinKlima || '',
          skrot: instNode.skrot || ''
        };
        db.instances.push(inst);
        nameIndex.instances[dept.name + '/' + el.name + '/' + inst.name] = inst.id;

        if (Array.isArray(instNode.zdjecia) && instNode.zdjecia.length) {
          instancePhotos[inst.id] = instNode.zdjecia.map((src, i) => persistPhoto(`inst_${inst.id}_${i}`, src)).filter(Boolean);
        }
        if (Array.isArray(instNode.zalaczniki) && instNode.zalaczniki.length) {
          instanceFiles[inst.id] = instNode.zalaczniki.map((f, i) => persistFile(`instfile_${inst.id}_${i}`, f)).filter(Boolean);
        }
        for (const infoNode of instNode.informacje || []) {
          const info = {
            id: uid('info'),
            instanceId: inst.id,
            name: infoNode.nazwa || '',
            description: infoNode.opis || '',
            optional: !!infoNode.opcjonalna,
            type: infoNode.typ === 'proces' ? 'process' : 'info'
          };
          const photo = persistPhoto('infophoto_' + info.id, infoNode.zdjecie);
          if (photo) info.photo = photo;
          db.informations.push(info);
        }
        for (const noteNode of instNode.uwagiTechnologiczne || []) {
          db.instanceNotes.push(noteFromImport(noteNode, 'instance', inst.id));
        }
      }
    }
  }

  for (const groupNode of tree.grupyInformacji || []) {
    const group = { id: uid('tgrp'), name: groupNode.nazwa || 'Grupa bez nazwy' };
    db.techGroups.push(group);
    nameIndex.groups[group.name] = group.id;
    for (const infoNode of groupNode.informacje || []) {
      db.techInfos.push({
        id: uid('tinfo'),
        groupId: group.id,
        name: infoNode.nazwa || '',
        description: infoNode.opis || '',
        optional: !!infoNode.opcjonalna
      });
    }
    for (const tableNode of groupNode.tabele || []) {
      const table = tableFromImport(tableNode.tabela);
      const item = {
        id: uid('ttab'),
        groupId: group.id,
        name: tableNode.nazwa || '',
        table,
        date: tableNode.data || ''
      };
      const written = files.writeJsonTable(item.id, table);
      item.dataFileName = written.fileName;
      db.techTables.push(item);
    }
  }

  const resolvePath = (node) => {
    const [a, b, c] = Array.isArray(node.sciezka) ? node.sciezka : [];
    if (node.typ === 'grupa' && nameIndex.groups[a]) return { type: 'techgroup', id: nameIndex.groups[a] };
    if (node.typ === 'dzial' && nameIndex.departments[a]) return { type: 'department', id: nameIndex.departments[a] };
    if (node.typ === 'element' && nameIndex.elements[a + '/' + b]) return { type: 'element', id: nameIndex.elements[a + '/' + b] };
    if (node.typ === 'instancja' && nameIndex.instances[a + '/' + b + '/' + c]) {
      return { type: 'instance', id: nameIndex.instances[a + '/' + b + '/' + c] };
    }
    return null;
  };
  for (const note of db.elementNotes.concat(db.instanceNotes)) {
    note.links = (note._paths || []).map(resolvePath).filter(Boolean);
    delete note._paths;
  }

  return { db, photos, instancePhotos, elementFiles, instanceFiles };
}

function writeSeedSql(state) {
  const lines = [
    'USE [BazaWiedzyProdukcyjnej];',
    'GO',
    'SET NOCOUNT ON;',
    'DELETE FROM dbo.NoteLinks;',
    'DELETE FROM dbo.Notes;',
    'DELETE FROM dbo.InstanceInformations;',
    'DELETE FROM dbo.ElementInformations;',
    'DELETE FROM dbo.TechInfos;',
    'DELETE FROM dbo.TechTables;',
    'DELETE FROM dbo.Photos;',
    'DELETE FROM dbo.Attachments;',
    'DELETE FROM dbo.Instances;',
    'DELETE FROM dbo.Elements;',
    'DELETE FROM dbo.Departments;',
    'DELETE FROM dbo.TechGroups;',
    'GO'
  ];
  const { db, photos, instancePhotos, elementFiles, instanceFiles } = state;
  db.departments.forEach((d, i) => {
    lines.push(`INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder) VALUES (${sqlStr(d.id)}, ${sqlStr(d.name)}, ${sqlStr(d.photo || null)}, ${i});`);
  });
  db.elements.forEach((e, i) => {
    lines.push(`INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (${sqlStr(e.id)}, ${sqlStr(e.departmentId)}, ${sqlStr(e.name)}, ${i});`);
  });
  db.instances.forEach((n, i) => {
    lines.push(`INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (${sqlStr(n.id)}, ${sqlStr(n.elementId)}, ${sqlStr(n.name)}, ${sqlStr(n.index || null)}, ${sqlStr(n.winklima || null)}, ${sqlStr(n.skrot || null)}, ${i});`);
  });
  db.elementInformations.forEach((info, i) => {
    lines.push(`INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (${sqlStr(info.id)}, ${sqlStr(info.elementId)}, ${sqlStr(info.name)}, ${sqlStr(info.description || '')}, ${info.optional ? 1 : 0}, ${i});`);
  });
  db.informations.forEach((info, i) => {
    lines.push(`INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (${sqlStr(info.id)}, ${sqlStr(info.instanceId)}, ${sqlStr(info.name)}, ${sqlStr(info.description || '')}, ${info.optional ? 1 : 0}, ${sqlStr(info.type || 'info')}, ${sqlStr(info.photo || null)}, ${i});`);
  });
  const dumpNotes = (list, scope, ownerKey) => {
    list.forEach((note, i) => {
      lines.push(`INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (${sqlStr(note.id)}, ${sqlStr(scope)}, ${sqlStr(note[ownerKey])}, ${sqlStr(note.kind || 'general')}, ${sqlStr(note.name || null)}, ${sqlStr(note.description || '')}, ${sqlNum(note.diameter)}, ${sqlStr(note.client || null)}, ${sqlStr(note.za || null)}, ${sqlDate(note.date)}, ${i});`);
      (note.links || []).forEach((link, li) => {
        lines.push(`INSERT INTO dbo.NoteLinks (NoteId, TargetType, TargetId, SortOrder) VALUES (${sqlStr(note.id)}, ${sqlStr(link.type)}, ${sqlStr(link.id)}, ${li});`);
      });
    });
  };
  dumpNotes(db.elementNotes, 'element', 'elementId');
  dumpNotes(db.instanceNotes, 'instance', 'instanceId');
  db.techGroups.forEach((g, i) => {
    lines.push(`INSERT INTO dbo.TechGroups (Id, Name, SortOrder) VALUES (${sqlStr(g.id)}, ${sqlStr(g.name)}, ${i});`);
  });
  db.techInfos.forEach((info, i) => {
    lines.push(`INSERT INTO dbo.TechInfos (Id, GroupId, Name, Description, Optional, SortOrder) VALUES (${sqlStr(info.id)}, ${sqlStr(info.groupId)}, ${sqlStr(info.name)}, ${sqlStr(info.description || '')}, ${info.optional ? 1 : 0}, ${i});`);
  });
  db.techTables.forEach((t, i) => {
    lines.push(`INSERT INTO dbo.TechTables (Id, GroupId, Name, DateUtc, SourceFileName, DataFileName, SortOrder) VALUES (${sqlStr(t.id)}, ${sqlStr(t.groupId)}, ${sqlStr(t.name)}, ${sqlDate(t.date)}, ${sqlStr(t.sourceFileName || null)}, ${sqlStr(t.dataFileName || (t.id + '.json'))}, ${i});`);
  });
  let p = 0;
  for (const [ownerId, items] of Object.entries(photos)) {
    items.forEach((url, i) => {
      const id = `photo_el_${p++}`;
      const fileName = decodeURIComponent(String(url).split('/').pop() || '');
      lines.push(`INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (${sqlStr(id)}, N'element', ${sqlStr(ownerId)}, ${sqlStr(fileName)}, ${sqlStr(url)}, ${i});`);
    });
  }
  for (const [ownerId, items] of Object.entries(instancePhotos)) {
    items.forEach((url, i) => {
      const id = `photo_inst_${p++}`;
      const fileName = decodeURIComponent(String(url).split('/').pop() || '');
      lines.push(`INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (${sqlStr(id)}, N'instance', ${sqlStr(ownerId)}, ${sqlStr(fileName)}, ${sqlStr(url)}, ${i});`);
    });
  }
  for (const [ownerId, items] of Object.entries(elementFiles)) {
    items.forEach((item, i) => {
      lines.push(`INSERT INTO dbo.Attachments (Id, OwnerType, OwnerId, OriginalName, FileName, Url, MimeType, SizeBytes, SortOrder) VALUES (${sqlStr(item.id)}, N'element', ${sqlStr(ownerId)}, ${sqlStr(item.name)}, ${sqlStr(item.fileName)}, ${sqlStr(item.url)}, ${sqlStr(item.type || '')}, ${item.size || 0}, ${i});`);
    });
  }
  for (const [ownerId, items] of Object.entries(instanceFiles)) {
    items.forEach((item, i) => {
      lines.push(`INSERT INTO dbo.Attachments (Id, OwnerType, OwnerId, OriginalName, FileName, Url, MimeType, SizeBytes, SortOrder) VALUES (${sqlStr(item.id)}, N'instance', ${sqlStr(ownerId)}, ${sqlStr(item.name)}, ${sqlStr(item.fileName)}, ${sqlStr(item.url)}, ${sqlStr(item.type || '')}, ${item.size || 0}, ${i});`);
    });
  }
  lines.push('GO');
  const dest = config.appPath('schema', 'seed.sql');
  fs.writeFileSync(dest, lines.join('\n'), 'utf8');
  return dest;
}

async function main() {
  if (!fs.existsSync(BACKUP)) {
    console.error('Brak pliku kopii:', config.relativeFromRoot(BACKUP));
    process.exit(1);
  }
  files.ensureStorageDirs();
  const tree = JSON.parse(fs.readFileSync(BACKUP, 'utf8'));
  console.log('Wczytano kopię, trwa rozpakowywanie zdjęć i tabel…');
  const state = nestedTreeToState(tree);
  await jsonStore.importAll(state);
  const seedPath = writeSeedSql(state);
  console.log('Zapisano data/state.json');
  console.log('Zapisano', config.relativeFromRoot(seedPath));
  console.log(`Działy: ${state.db.departments.length}, elementy: ${state.db.elements.length}, instancje: ${state.db.instances.length}`);
  console.log(`Grupy: ${state.db.techGroups.length}, tabele: ${state.db.techTables.length}`);

  if (config.mssqlEnabled) {
    try {
      const mssqlStore = require('../server/store/mssql-store');
      await mssqlStore.connect();
      await mssqlStore.importAll(state);
      console.log('Dane wstawione do MSSQL.');
    } catch (err) {
      console.warn('MSSQL niedostępny — seed plikowy jest gotowy. Błąd:', err.message);
    }
  } else {
    console.log('MSSQL wyłączone. Aplikacja użyje data/state.json do czasu konfiguracji bazy.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
