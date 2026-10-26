/* ===== js/handlers.js ===== */
/*
 * handlers.js — Event wiring. attachHandlers() re-runs after every
 * render(), because render() replaces #app's innerHTML and destroys any
 * previously-bound listeners. Each attachXxx(app) function owns exactly
 * one feature area's worth of querySelectorAll(...).addEventListener(...)
 * calls, so a change to (say) the notes feature never risks touching the
 * attachments code sitting next to it.
 */

function attachHandlers(){
  const app = document.getElementById('app');

  attachBackupHandlers(app);
  attachSearchHandlers(app);
  attachBackNavigationHandlers(app);
  attachBreadcrumbHandlers(app);
  attachDepartmentHandlers(app);
  attachElementListHandlers(app);
  attachElementGeneralInfoHandlers(app);
  attachElementNotesOpenHandler(app);
  attachElementFilesOpenHandler(app);
  attachInstanceNotesOpenHandler(app);
  attachInstanceFilesOpenHandler(app);
  attachNotesHandlers(app);
  attachInstancesViewHandlers(app);
  attachElementPhotoHandlers(app);
  attachInstancePhotoHandlers(app);
  attachElementFileUploadHandlers(app);
  attachInstanceFileUploadHandlers(app);
  attachInformationHandlers(app);
  attachNavHandlers(app);
  attachTechHandlers(app);
  attachTechTableHandlers(app);
  attachEditMenuHandlers(app);
  attachSearchDismissHandler(app);
}

function attachEditMenuHandlers(app){
  app.querySelectorAll('[data-edit-menu-toggle]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const menu = btn.closest('.edit-menu');
      const wasOpen = menu.classList.contains('open');
      app.querySelectorAll('.edit-menu.open').forEach(m=> m.classList.remove('open'));
      if(!wasOpen) menu.classList.add('open');
    });
  });
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.edit-menu')){
      document.querySelectorAll('.edit-menu.open').forEach(m=> m.classList.remove('open'));
    }
  }, { once:true });
}

/* Top menu tabs */
function attachNavHandlers(app){
  app.querySelectorAll('[data-nav-section]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = btn.getAttribute('data-nav-section');
      resetTo(target==='tech' ? [{view:'tech-groups'}] : [{view:'departments'}]);
    });
  });
}

/* Informacje Technologiczne: tables read from Excel files (add / edit cells / delete) */
function attachTechTableHandlers(app){
  const addBtn = document.getElementById('add-tech-table-btn');
  if(addBtn) addBtn.addEventListener('click', ()=>{
    const groupId = currentView().groupId;
    openTableAddModal({ onSave: async ({ name, table, file })=>{
      const item = { id: uid('ttab'), groupId, name, table, date: nowIso() };
      try{
        await saveTechTable({ ...item, file });
        db.techTables.push(item);
        render();
      }catch(err){
        showToast('Nie udało się zapisać tabeli.');
      }
    }});
  });
  app.querySelectorAll('[data-edit-tech-table]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const item = db.techTables.find(t=>t.id===elx.getAttribute('data-edit-tech-table'));
      if(!item) return;
      openTableEditModal({ item, onSave: async ({ name, table })=>{
        const changed = item.name !== name || JSON.stringify(item.table.rows) !== JSON.stringify(table.rows);
        if(changed){
          item.name = name;
          item.table = table;
          item.date = nowIso();
          try{ await updateTechTable(item.id, item); }
          catch(err){ showToast('Nie udało się zapisać tabeli.'); }
        }
        render();
      }});
    });
  });
  app.querySelectorAll('[data-del-tech-table]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const id = elx.getAttribute('data-del-tech-table');
      confirmDelete('Ta tabela zostanie usunięta.', async ()=>{
        try{
          await deleteTechTable(id);
          db.techTables = db.techTables.filter(t=>t.id!==id);
          render();
        }catch(err){
          showToast('Nie udało się usunąć tabeli.');
        }
      });
    });
  });
}

/* Informacje Technologiczne: groups and their general information */
function attachTechHandlers(app){
  const infoFields = [
    {key:'name', label:'Nazwa informacji', type:'text'},
    {key:'description', label:'Opis', type:'textarea'},
    {key:'optional', label:'Oznacz jako opcjonalną', type:'checkbox'}
  ];

  const addGroupBtn = document.getElementById('add-tech-group-btn');
  if(addGroupBtn) addGroupBtn.addEventListener('click', ()=>{
    openModal({
      title:'Nowa grupa informacji',
      fields:[{key:'name', label:'Nazwa grupy', type:'text'}],
      onSave: async (vals)=>{
        db.techGroups.push({ id: uid('tgrp'), name: vals.name });
        await saveData();
        render();
      }
    });
  });
  app.querySelectorAll('[data-open-tech-group]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      pushView({view:'tech-group', groupId: elx.getAttribute('data-open-tech-group')});
    });
  });
  const delTechGroupBtn = document.getElementById('del-tech-group-btn');
  if(delTechGroupBtn) delTechGroupBtn.addEventListener('click', ()=>{
    const id = currentView().groupId;
    const group = getTechGroup(id);
    if(!group) return;
    confirmDelete(`Grupa „${group.name}” wraz ze wszystkimi informacjami i tabelami zostanie usunięta.`, async ()=>{
      const tableIds = db.techTables.filter(t=>t.groupId===id).map(t=>t.id);
      for(const tableId of tableIds){
        try{ await deleteTechTable(tableId); }catch(e){}
      }
      db.techInfos = db.techInfos.filter(i=>i.groupId!==id);
      db.techTables = db.techTables.filter(t=>t.groupId!==id);
      db.techGroups = db.techGroups.filter(g=>g.id!==id);
      await saveData();
      resetTo([{view:'tech-groups'}]);
    });
  });
  app.querySelectorAll('[data-goto-tech-groups]').forEach(elx=>{
    elx.addEventListener('click', ()=> resetTo([{view:'tech-groups'}]));
  });

  const editGroupBtn = document.getElementById('edit-tech-group-btn');
  if(editGroupBtn) editGroupBtn.addEventListener('click', ()=>{
    const group = getTechGroup(currentView().groupId);
    openModal({
      title:'Edytuj grupę informacji',
      fields:[{key:'name', label:'Nazwa grupy', type:'text'}],
      initial:{ name: group.name },
      onSave: async (vals)=>{
        group.name = vals.name;
        await saveData();
        render();
      }
    });
  });

  const addInfoBtn = document.getElementById('add-tech-info-btn');
  if(addInfoBtn) addInfoBtn.addEventListener('click', ()=>{
    const groupId = currentView().groupId;
    openModal({
      title:'Nowa informacja ogólna',
      fields: infoFields,
      onSave: async (vals)=>{
        db.techInfos.push({ id: uid('tinfo'), groupId, name: vals.name, description: vals.description, optional: !!vals.optional });
        await saveData();
        render();
      }
    });
  });
  app.querySelectorAll('[data-edit-tech-info]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const info = db.techInfos.find(i=>i.id===elx.getAttribute('data-edit-tech-info'));
      if(!info) return;
      openModal({
        title:'Edytuj informację ogólną',
        fields: infoFields,
        initial:{ name: info.name, description: info.description, optional: info.optional },
        onSave: async (vals)=>{
          info.name = vals.name; info.description = vals.description; info.optional = !!vals.optional;
          await saveData();
          render();
        }
      });
    });
  });
  app.querySelectorAll('[data-del-tech-info]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const id = elx.getAttribute('data-del-tech-info');
      confirmDelete('Ta informacja ogólna zostanie usunięta.', async ()=>{
        db.techInfos = db.techInfos.filter(i=>i.id!==id);
        await saveData();
        render();
      });
    });
  });
  app.querySelectorAll('[data-move-tech-info]').forEach(elx=>{
    elx.addEventListener('click', async ()=>{
      if(elx.disabled) return;
      if(moveTechInfo(currentView().groupId, elx.getAttribute('data-move-tech-info'), elx.getAttribute('data-move-dir'))){
        await saveData();
        render();
      }
    });
  });
}

/* Import/export backup buttons */
function attachBackupHandlers(app){
  // backup export / import
  const exportBtn = document.getElementById('export-btn');
  if(exportBtn) exportBtn.addEventListener('click', exportBackup);
  const importInput = document.getElementById('import-input');
  if(importInput) importInput.addEventListener('change', (e)=>{
    const file = e.target.files[0];
    if(file) importBackup(file);
    e.target.value = '';
  });

}

/* Global element search box */
function attachSearchHandlers(app){
  // search
  const searchInput = document.getElementById('search-input');
  if(searchInput){
    searchInput.addEventListener('input', (e)=>{
      searchQuery = e.target.value;
      render();
      const el = document.getElementById('search-input');
      if(el){ el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
    });
  }
  app.querySelectorAll('[data-goto-element]').forEach(elx=>{
    elx.addEventListener('click', async ()=>{
      const deptId = elx.getAttribute('data-goto-dept');
      const elementId = elx.getAttribute('data-goto-element');
      // same preload as opening the element from its department, so "Wstecz" shows its photos/files
      if(!photoCache[elementId]) photoCache[elementId] = await loadPhotos(elementId);
      if(!elementFilesCache[elementId]) elementFilesCache[elementId] = await loadElementFiles(elementId);
      const instanceId = elx.getAttribute('data-goto-instance');
      const stack = [{view:'departments'},{view:'elements',departmentId:deptId},{view:'instances',elementId}];
      if(instanceId) stack.push({view:'information',instanceId});
      resetTo(stack);
    });
  });

}

/* Back button */
function attachBackNavigationHandlers(app){
  // back
  const backBtn = document.getElementById('back-btn');
  if(backBtn) backBtn.addEventListener('click', goBack);

}

/* Breadcrumb links */
function attachBreadcrumbHandlers(app){
  // breadcrumb clicks
  app.querySelectorAll('[data-goto-dept-crumb]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const id = elx.getAttribute('data-goto-dept-crumb');
      resetTo([{view:'departments'},{view:'elements',departmentId:id}]);
    });
  });
  app.querySelectorAll('[data-goto-element-crumb]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const deptId = elx.getAttribute('data-goto-dept');
      const elementId = elx.getAttribute('data-goto-element-crumb');
      resetTo([{view:'departments'},{view:'elements',departmentId:deptId},{view:'instances',elementId}]);
    });
  });

}

/* Departments view: add/open/delete/photo */
function attachDepartmentHandlers(app){
  // Departments view
  const addDeptBtn = document.getElementById('add-dept-btn');
  if(addDeptBtn) addDeptBtn.addEventListener('click', ()=>{
    openModal({
      title:'Nowy dział',
      fields:[{key:'name', label:'Nazwa działu', type:'text'}],
      onSave: async (vals)=>{
        db.departments.push({ id: uid('dept'), name: vals.name });
        await saveData();
        render();
      }
    });
  });
  app.querySelectorAll('[data-open-dept]').forEach(elx=>{
    elx.addEventListener('click', (e)=>{
      if(e.target.closest('[data-add-dept-photo]')) return;
      pushView({view:'elements', departmentId: elx.getAttribute('data-open-dept')});
    });
  });
  app.querySelectorAll('[data-dept-photo-input]').forEach(elx=>{
    elx.addEventListener('click', (e)=> e.stopPropagation());
    elx.addEventListener('change', async (e)=>{
      e.stopPropagation();
      const file = e.target.files[0];
      if(!file) return;
      const id = elx.getAttribute('data-dept-photo-input');
      const dept = getDept(id);
      if(!dept) return;
      try{
        dept.photo = await resizeImageFile(file);
        await saveData();
        render();
      }catch(err){
        showToast('Nie udało się przetworzyć zdjęcia.');
      }
    });
  });
  const delDeptBtn = document.getElementById('del-department-btn');
  if(delDeptBtn) delDeptBtn.addEventListener('click', ()=>{
    const id = currentView().departmentId;
    const dept = getDept(id);
    if(!dept) return;
    confirmDelete(`Dział „${dept.name}” wraz ze wszystkimi elementami, instancjami i informacjami zostanie usunięty.`, async ()=>{
      const elIds = elementsOf(id).map(e=>e.id);
      const instIds = db.instances.filter(i=>elIds.includes(i.elementId)).map(i=>i.id);
      db.informations = db.informations.filter(inf=>!instIds.includes(inf.instanceId));
      db.elementInformations = db.elementInformations.filter(inf=>!elIds.includes(inf.elementId));
      db.elementNotes = db.elementNotes.filter(n=>!elIds.includes(n.elementId));
      db.instanceNotes = db.instanceNotes.filter(n=>!instIds.includes(n.instanceId));
      db.instances = db.instances.filter(i=>!elIds.includes(i.elementId));
      db.elements = db.elements.filter(e=>e.departmentId!==id);
      db.departments = db.departments.filter(d=>d.id!==id);
      await saveData();
      await deleteOwnedMedia('element', elIds);
      await deleteOwnedMedia('instance', instIds);
      for(const elId of elIds){ delete photoCache[elId]; delete elementFilesCache[elId]; }
      for(const instId of instIds){ delete instancePhotoCache[instId]; delete instanceFilesCache[instId]; }
      resetTo([{view:'departments'}]);
    });
  });

}

/* Elements view: add/open/delete element */
function attachElementListHandlers(app){
  // Elements view
  const editDeptBtn = document.getElementById('edit-department-btn');
  if(editDeptBtn) editDeptBtn.addEventListener('click', ()=>{
    const view = currentView();
    const dept = getDept(view.departmentId);
    openModal({
      title:'Edytuj dział',
      fields:[
        {key:'name', label:'Nazwa działu', type:'text'},
        {key:'photo', label:'Zdjęcie', type:'image'}
      ],
      initial:{ name: dept.name, photo: dept.photo || null },
      onSave: async (vals)=>{
        dept.name = vals.name;
        if(vals.photo){ dept.photo = vals.photo; } else { delete dept.photo; }
        await saveData();
        render();
      }
    });
  });
  const addElBtn = document.getElementById('add-element-btn');
  if(addElBtn) addElBtn.addEventListener('click', ()=>{
    const view = currentView();
    openModal({
      title:'Nowy element',
      fields:[
        {key:'name', label:'Nazwa elementu', type:'text'}
      ],
      onSave: async (vals)=>{
        db.elements.push({
          id: uid('el'),
          departmentId: view.departmentId,
          name: vals.name
        });
        await saveData();
        render();
      }
    });
  });
  app.querySelectorAll('[data-open-element]').forEach(elx=>{
    elx.addEventListener('click', async ()=>{
      const id = elx.getAttribute('data-open-element');
      if(!photoCache[id]) photoCache[id] = await loadPhotos(id);
      if(!elementFilesCache[id]) elementFilesCache[id] = await loadElementFiles(id);
      pushView({view:'instances', elementId: id});
    });
  });
  const editElBtn = document.getElementById('edit-element-btn');
  if(editElBtn) editElBtn.addEventListener('click', ()=>{
    const el = getElement(currentView().elementId);
    if(!el) return;
    openModal({
      title:'Edytuj element',
      fields:[{key:'name', label:'Nazwa elementu', type:'text'}],
      initial:{ name: el.name },
      onSave: async (vals)=>{
        el.name = vals.name;
        await saveData();
        render();
      }
    });
  });
  const delElBtn = document.getElementById('del-element-btn');
  if(delElBtn) delElBtn.addEventListener('click', ()=>{
    const id = currentView().elementId;
    const el = getElement(id);
    if(!el) return;
    confirmDelete(`Element „${el.name}” wraz z instancjami i informacjami zostanie usunięty.`, async ()=>{
      const instIds = instancesOf(id).map(i=>i.id);
      const deptId = el.departmentId;
      db.informations = db.informations.filter(inf=>!instIds.includes(inf.instanceId));
      db.elementInformations = db.elementInformations.filter(inf=>inf.elementId!==id);
      db.elementNotes = db.elementNotes.filter(n=>n.elementId!==id);
      db.instanceNotes = db.instanceNotes.filter(n=>!instIds.includes(n.instanceId));
      db.instances = db.instances.filter(i=>i.elementId!==id);
      db.elements = db.elements.filter(e=>e.id!==id);
      await saveData();
      await deleteOwnedMedia('element', [id]);
      await deleteOwnedMedia('instance', instIds);
      delete photoCache[id];
      delete elementFilesCache[id];
      for(const instId of instIds){ delete instancePhotoCache[instId]; delete instanceFilesCache[instId]; }
      resetTo([{view:'departments'},{view:'elements',departmentId:deptId}]);
    });
  });

}

/* Element-level "Informacje ogólne" */
function attachElementGeneralInfoHandlers(app){
  // Element-level general information
  const addElInfoBtn = document.getElementById('add-element-info-btn');
  if(addElInfoBtn) addElInfoBtn.addEventListener('click', ()=>{
    const view = currentView();
    openModal({
      title:'Nowa informacja ogólna',
      fields:[
        {key:'name', label:'Nazwa informacji', type:'text'},
        {key:'description', label:'Opis', type:'textarea'},
        {key:'optional', label:'Oznacz jako opcjonalną', type:'checkbox'}
      ],
      onSave: async (vals)=>{
        db.elementInformations.push({ id: uid('elinfo'), elementId: view.elementId, name: vals.name, description: vals.description, optional: !!vals.optional });
        await saveData();
        render();
      }
    });
  });
  app.querySelectorAll('[data-edit-el-info]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const id = elx.getAttribute('data-edit-el-info');
      const info = db.elementInformations.find(i=>i.id===id);
      openModal({
        title:'Edytuj informację ogólną',
        fields:[
          {key:'name', label:'Nazwa informacji', type:'text'},
          {key:'description', label:'Opis', type:'textarea'},
          {key:'optional', label:'Oznacz jako opcjonalną', type:'checkbox'}
        ],
        initial:{ name: info.name, description: info.description, optional: info.optional },
        onSave: async (vals)=>{
          info.name = vals.name; info.description = vals.description; info.optional = !!vals.optional;
          await saveData();
          render();
        }
      });
    });
  });
  app.querySelectorAll('[data-del-el-info]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const id = elx.getAttribute('data-del-el-info');
      confirmDelete('Ta informacja ogólna zostanie usunięta.', async ()=>{
        db.elementInformations = db.elementInformations.filter(i=>i.id!==id);
        await saveData();
        render();
      });
    });
  });
  app.querySelectorAll('[data-move-el-info]').forEach(elx=>{
    elx.addEventListener('click', async ()=>{
      if(elx.disabled) return;
      const id = elx.getAttribute('data-move-el-info');
      const dir = elx.getAttribute('data-move-dir');
      const view = currentView();
      const moved = moveElementInfo(view.elementId, id, dir);
      if(moved){
        await saveData();
        render();
      }
    });
  });

}

/* Open element-level Uwagi technologiczne */
function attachElementNotesOpenHandler(app){
  // Open element-level "Uwagi technologiczne" view
  const openElNotesBtn = document.getElementById('open-element-notes-btn');
  if(openElNotesBtn) openElNotesBtn.addEventListener('click', ()=>{
    const view = currentView();
    pushView({view:'element-notes', elementId: view.elementId});
  });

}

/* Open element-level Załączniki */
function attachElementFilesOpenHandler(app){
  // Open element-level "Załączniki" view
  const openElFilesBtn = document.getElementById('open-element-files-btn');
  if(openElFilesBtn) openElFilesBtn.addEventListener('click', ()=>{
    const view = currentView();
    pushView({view:'element-files', elementId: view.elementId});
  });

}

/* Open instance-level Uwagi technologiczne */
function attachInstanceNotesOpenHandler(app){
  // Open instance-level "Uwagi technologiczne" view
  const editInstDetailsBtn = document.getElementById('edit-instance-details-btn');
  if(editInstDetailsBtn) editInstDetailsBtn.addEventListener('click', ()=>{
    const inst = getInstance(currentView().instanceId);
    openModal({
      title:'Edytuj informacje',
      fields:[
        {key:'index', label:'Index', type:'text'},
        {key:'winklima', label:'Numer WinKlima', type:'text'},
        {key:'skrot', label:'Skrót', type:'text'}
      ],
      initial:{ index: inst.index || '', winklima: inst.winklima || '', skrot: inst.skrot || '' },
      onSave: async (vals)=>{
        inst.index = vals.index;
        inst.winklima = vals.winklima;
        inst.skrot = vals.skrot;
        await saveData();
        render();
      }
    });
  });

  const openInstNotesBtn = document.getElementById('open-instance-notes-btn');
  if(openInstNotesBtn) openInstNotesBtn.addEventListener('click', ()=>{
    const view = currentView();
    pushView({view:'instance-notes', instanceId: view.instanceId});
  });

}

/* Open instance-level Załączniki */
function attachInstanceFilesOpenHandler(app){
  // Open instance-level "Załączniki" view
  const openInstFilesBtn = document.getElementById('open-instance-files-btn');
  if(openInstFilesBtn) openInstFilesBtn.addEventListener('click', ()=>{
    const view = currentView();
    pushView({view:'instance-files', instanceId: view.instanceId});
  });

}

/* Uwagi technologiczne: add / edit / delete / reorder.
 * One implementation serves both the element-level and the instance-level
 * notes screen; the current view decides which list is being edited. */
function currentNotesContext(){
  const v = currentView();
  if(v.view === 'element-notes')  return { scope: 'element',  ownerId: v.elementId };
  if(v.view === 'instance-notes') return { scope: 'instance', ownerId: v.instanceId };
  return null;
}

function attachNotesHandlers(app){
  const ctx = currentNotesContext();
  if(!ctx) return;
  const { scope, ownerId } = ctx;
  const listName = NOTE_SCOPES[scope].list;
  const findNote = id => db[listName].find(n => n.id === id);

  app.querySelectorAll('[data-note-link-type]').forEach(btn=>{
    btn.addEventListener('click', ()=> openSidePanel({ type: btn.getAttribute('data-note-link-type'), id: btn.getAttribute('data-note-link-id') }));
  });

  const addBtn = document.getElementById('add-note-btn');
  if(addBtn) addBtn.addEventListener('click', ()=>{
    openNoteModal({
      title:'Nowa uwaga technologiczna',
      instructionExists: !!instructionOf(scope, ownerId),
      onSave: async (vals)=>{
        createNote(scope, ownerId, vals);
        await saveData();
        render();
      }
    });
  });

  app.querySelectorAll('[data-edit-note]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const note = findNote(elx.getAttribute('data-edit-note'));
      if(!note) return;
      openNoteModal({
        title:'Edytuj uwagę technologiczną',
        note,
        onSave: async (vals)=>{
          if(updateNote(note, vals)) await saveData();
          render();
        }
      });
    });
  });

  app.querySelectorAll('[data-del-note]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const id = elx.getAttribute('data-del-note');
      confirmDelete('Ta uwaga technologiczna zostanie usunięta.', async ()=>{
        db[listName] = db[listName].filter(n => n.id !== id);
        await saveData();
        render();
      });
    });
  });

  app.querySelectorAll('[data-move-note]').forEach(elx=>{
    elx.addEventListener('click', async ()=>{
      if(elx.disabled) return;
      const moved = moveGeneralNote(scope, ownerId, elx.getAttribute('data-move-note'), elx.getAttribute('data-move-dir'));
      if(moved){
        await saveData();
        render();
      }
    });
  });
}

/* Instances view: add/open/delete instance */
function attachInstancesViewHandlers(app){
  // Instances view
  const addInstBtn = document.getElementById('add-instance-btn');
  if(addInstBtn) addInstBtn.addEventListener('click', ()=>{
    const view = currentView();
    openModal({
      title:'Nowa instancja',
      fields:[
        {key:'name', label:'Nazwa instancji (np. wariant, konfiguracja)', type:'text'},
        {key:'index', label:'Index', type:'text'},
        {key:'winklima', label:'Numer WinKlima', type:'text'},
        {key:'skrot', label:'Skrót', type:'text'}
      ],
      onSave: async (vals)=>{
        db.instances.push({ id: uid('inst'), elementId: view.elementId, name: vals.name, index: vals.index, winklima: vals.winklima, skrot: vals.skrot });
        await saveData();
        render();
      }
    });
  });
  app.querySelectorAll('[data-open-instance]').forEach(elx=>{
    elx.addEventListener('click', (e)=>{
      if(e.target.closest('[data-del-instance]')) return;
      pushView({view:'information', instanceId: elx.getAttribute('data-open-instance')});
    });
  });
  app.querySelectorAll('[data-del-instance]').forEach(elx=>{
    elx.addEventListener('click', (e)=>{
      e.stopPropagation();
      const id = elx.getAttribute('data-del-instance');
      const inst = getInstance(id);
      confirmDelete(`Instancja „${inst.name}” wraz z jej informacjami zostanie usunięta.`, async ()=>{
        db.informations = db.informations.filter(inf=>inf.instanceId!==id);
        db.instanceNotes = db.instanceNotes.filter(n=>n.instanceId!==id);
        db.instances = db.instances.filter(i=>i.id!==id);
        await saveData();
        await deleteOwnedMedia('instance', [id]);
        delete instancePhotoCache[id];
        delete instanceFilesCache[id];
        render();
      });
    });
  });

}

/* Element cover-photo strip */
function attachElementPhotoHandlers(app){
  // Photo handling
  const photoInput = document.getElementById('photo-input');
  if(photoInput){
    photoInput.addEventListener('change', async (e)=>{
      const file = e.target.files[0];
      if(!file) return;
      const view = currentView();
      try{
        const dataUrl = await resizeImageFile(file);
        photoCache[view.elementId] = photoCache[view.elementId] || [];
        photoCache[view.elementId].push(dataUrl);
        await savePhotos(view.elementId, photoCache[view.elementId]);
        render();
      }catch(err){
        showToast('Nie udało się przetworzyć zdjęcia.');
      }
    });
  }
  app.querySelectorAll('[data-view-photo]').forEach(elx=>{
    elx.addEventListener('click', ()=> openLightbox(elx.src));
  });
  app.querySelectorAll('[data-del-photo]').forEach(elx=>{
    elx.addEventListener('click', async (e)=>{
      e.stopPropagation();
      const idx = parseInt(elx.getAttribute('data-del-photo'),10);
      const view = currentView();
      confirmDelete('To zdjęcie zostanie usunięte.', async ()=>{
        photoCache[view.elementId].splice(idx,1);
        await savePhotos(view.elementId, photoCache[view.elementId]);
        render();
      });
    });
  });

}

/* Instance cover-photo strip */
function attachInstancePhotoHandlers(app){
  // Photo handling - instance level
  const instancePhotoInput = document.getElementById('instance-photo-input');
  if(instancePhotoInput){
    instancePhotoInput.addEventListener('change', async (e)=>{
      const file = e.target.files[0];
      if(!file) return;
      const view = currentView();
      try{
        const dataUrl = await resizeImageFile(file);
        instancePhotoCache[view.instanceId] = instancePhotoCache[view.instanceId] || [];
        instancePhotoCache[view.instanceId].push(dataUrl);
        await saveInstancePhotos(view.instanceId, instancePhotoCache[view.instanceId]);
        render();
      }catch(err){
        showToast('Nie udało się przetworzyć zdjęcia.');
      }
    });
  }
  app.querySelectorAll('[data-view-instance-photo]').forEach(elx=>{
    elx.addEventListener('click', ()=> openLightbox(elx.src));
  });
  app.querySelectorAll('[data-del-instance-photo]').forEach(elx=>{
    elx.addEventListener('click', async (e)=>{
      e.stopPropagation();
      const idx = parseInt(elx.getAttribute('data-del-instance-photo'),10);
      const view = currentView();
      confirmDelete('To zdjęcie zostanie usunięte.', async ()=>{
        instancePhotoCache[view.instanceId].splice(idx,1);
        await saveInstancePhotos(view.instanceId, instancePhotoCache[view.instanceId]);
        render();
      });
    });
  });

}

/* Element attachment upload/delete */
function attachElementFileUploadHandlers(app){
  // File attachments - element level
  const elementFileInput = document.getElementById('element-file-input');
  if(elementFileInput){
    elementFileInput.addEventListener('change', async (e)=>{
      const files = Array.from(e.target.files || []);
      if(files.length===0) return;
      const view = currentView();
      elementFilesCache[view.elementId] = elementFilesCache[view.elementId] || [];
      try{
        for(const file of files){
          const dataUrl = await readFileAsDataUrl(file);
          elementFilesCache[view.elementId].push({ id: uid('file'), name: file.name, type: file.type, size: file.size, dataUrl });
        }
        await saveElementFiles(view.elementId, elementFilesCache[view.elementId]);
        render();
      }catch(err){
        showToast('Nie udało się dodać załącznika.');
      }
    });
  }
  app.querySelectorAll('[data-del-el-file]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const id = elx.getAttribute('data-del-el-file');
      const view = currentView();
      confirmDelete('Ten załącznik zostanie usunięty.', async ()=>{
        elementFilesCache[view.elementId] = elementFilesCache[view.elementId].filter(f=>f.id!==id);
        await saveElementFiles(view.elementId, elementFilesCache[view.elementId]);
        render();
      });
    });
  });

}

/* Instance attachment upload/delete */
function attachInstanceFileUploadHandlers(app){
  // File attachments - instance level
  const instanceFileInput = document.getElementById('instance-file-input');
  if(instanceFileInput){
    instanceFileInput.addEventListener('change', async (e)=>{
      const files = Array.from(e.target.files || []);
      if(files.length===0) return;
      const view = currentView();
      instanceFilesCache[view.instanceId] = instanceFilesCache[view.instanceId] || [];
      try{
        for(const file of files){
          const dataUrl = await readFileAsDataUrl(file);
          instanceFilesCache[view.instanceId].push({ id: uid('file'), name: file.name, type: file.type, size: file.size, dataUrl });
        }
        await saveInstanceFiles(view.instanceId, instanceFilesCache[view.instanceId]);
        render();
      }catch(err){
        showToast('Nie udało się dodać załącznika.');
      }
    });
  }
  app.querySelectorAll('[data-del-inst-file]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const id = elx.getAttribute('data-del-inst-file');
      const view = currentView();
      confirmDelete('Ten załącznik zostanie usunięty.', async ()=>{
        instanceFilesCache[view.instanceId] = instanceFilesCache[view.instanceId].filter(f=>f.id!==id);
        await saveInstanceFiles(view.instanceId, instanceFilesCache[view.instanceId]);
        render();
      });
    });
  });


}

/* Informacje/procesy: photo, CRUD, reorder */
function attachInformationHandlers(app){
  // Information view
  app.querySelectorAll('[data-info-photo-input]').forEach(elx=>{
    elx.addEventListener('change', async (e)=>{
      const file = e.target.files[0];
      if(!file) return;
      const id = elx.getAttribute('data-info-photo-input');
      const info = db.informations.find(i=>i.id===id);
      if(!info) return;
      try{
        info.photo = await resizeImageFile(file, 400);
        await saveData();
        render();
      }catch(err){
        showToast('Nie udało się przetworzyć zdjęcia.');
      }
    });
  });
  app.querySelectorAll('[data-view-info-photo]').forEach(elx=>{
    elx.addEventListener('click', ()=> openLightbox(elx.src));
  });
  app.querySelectorAll('[data-move-info]').forEach(elx=>{
    elx.addEventListener('click', async ()=>{
      if(elx.disabled) return;
      const id = elx.getAttribute('data-move-info');
      const dir = elx.getAttribute('data-move-dir');
      const view = currentView();
      const moved = moveInfo(view.instanceId, id, dir);
      if(moved){
        await saveData();
        render();
      }
    });
  });
  const addInfoBtn = document.getElementById('add-info-btn');
  if(addInfoBtn) addInfoBtn.addEventListener('click', ()=>{
    const view = currentView();
    openModal({
      title:'Nowa informacja',
      fields:[
        {key:'name', label:'Nazwa informacji', type:'text'},
        {key:'description', label:'Opis', type:'textarea'},
        {key:'optional', label:'Oznacz jako opcjonalną', type:'checkbox'}
      ],
      onSave: async (vals)=>{
        db.informations.push({ id: uid('info'), instanceId: view.instanceId, name: vals.name, description: vals.description, optional: !!vals.optional, type:'info' });
        await saveData();
        render();
      }
    });
  });
  const addProcessBtn = document.getElementById('add-process-btn');
  if(addProcessBtn) addProcessBtn.addEventListener('click', ()=>{
    const view = currentView();
    const inst = getInstance(view.instanceId);
    const el = getElement(inst.elementId);
    const dept = getDept(el.departmentId);
    openProcessModal(view, inst, el, dept);
  });
  app.querySelectorAll('[data-edit-info]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const id = elx.getAttribute('data-edit-info');
      const info = db.informations.find(i=>i.id===id);
      if(info.type==='process'){
        openModal({
          title:`Edytuj: ${info.name}`,
          fields:[
            {key:'description', label:'Opis', type:'textarea'},
            {key:'photo', label:'Zdjęcie', type:'image'}
          ],
          initial:{ description: info.description, photo: info.photo || null },
          onSave: async (vals)=>{
            info.description = vals.description;
            if(vals.photo){ info.photo = vals.photo; } else { delete info.photo; }
            await saveData();
            render();
          }
        });
        return;
      }
      openModal({
        title:'Edytuj informację',
        fields:[
          {key:'name', label:'Nazwa informacji', type:'text'},
          {key:'description', label:'Opis', type:'textarea'},
          {key:'optional', label:'Oznacz jako opcjonalną', type:'checkbox'},
          {key:'photo', label:'Zdjęcie', type:'image'}
        ],
        initial:{ name: info.name, description: info.description, optional: info.optional, photo: info.photo || null },
        onSave: async (vals)=>{
          info.name = vals.name; info.description = vals.description; info.optional = !!vals.optional;
          if(vals.photo){ info.photo = vals.photo; } else { delete info.photo; }
          await saveData();
          render();
        }
      });
    });
  });
  app.querySelectorAll('[data-del-info]').forEach(elx=>{
    elx.addEventListener('click', ()=>{
      const id = elx.getAttribute('data-del-info');
      confirmDelete('Ta informacja zostanie usunięta.', async ()=>{
        db.informations = db.informations.filter(i=>i.id!==id);
        await saveData();
        render();
      });
    });
  });

}

/* Close search dropdown on outside click */
function attachSearchDismissHandler(app){
  // close search dropdown on outside click
  document.addEventListener('click', (e)=>{
    if(searchQuery && !e.target.closest('.search-wrap')){
      searchQuery=''; render();
    }
  }, { once:true });
}
