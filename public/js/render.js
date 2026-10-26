/* ===== js/render.js ===== */
/*
 * render.js — Pure(ish) view layer. Every renderXxx(...) function takes
 * ids/state and returns an HTML string; none of them mutate state or
 * attach event listeners. render() is the single entry point that decides
 * which view function to call based on the current navigation stack entry.
 */

/* ---------------- Search ---------------- */
/* One result per matching instance. An instance matches on its own name,
 * Index, WinKlima number or Skrót; when the query matches the element's name
 * all of that element's instances are listed. An element without instances
 * that matches by name is listed itself (instance: null). */
function searchElements(q){
  q = q.trim().toLowerCase();
  if(!q) return [];
  const has = f => f && String(f).toLowerCase().includes(q);
  const results = [];
  for(const e of db.elements){
    const dept = getDept(e.departmentId);
    if(!dept) continue;
    const insts = instancesOf(e.id);
    if(insts.length === 0){
      if(has(e.name)) results.push({ dept, element: e, instance: null });
      continue;
    }
    const nameMatch = has(e.name);
    for(const i of insts){
      if(nameMatch || has(i.name) || has(i.index) || has(i.winklima) || has(i.skrot)){
        results.push({ dept, element: e, instance: i });
      }
    }
  }
  return results;
}

/* ---------------- Rendering ---------------- */
function render(){
  const outer = rendering;
  rendering = true;
  try{ renderApp(); }finally{ rendering = outer; }
}

/* Loads an element's own photos/files (needed by its views) when the view
 * was reached directly, e.g. with the browser's Back button or via a link. */
async function ensureElementDataLoaded(elementId){
  if(photoCache[elementId] && elementFilesCache[elementId]) return;
  if(!photoCache[elementId]) photoCache[elementId] = await loadPhotos(elementId);
  if(!elementFilesCache[elementId]) elementFilesCache[elementId] = await loadElementFiles(elementId);
  const v = currentView();
  if((v.view === 'instances' || v.view === 'element-files') && v.elementId === elementId) render();
}

function renderApp(){
  const stackAtStart = navStack;
  const app = document.getElementById('app');
  const view = currentView();
  let html = '';

  html += renderTopbar();

  if(view.view==='departments') html += renderDepartmentsView();
  else if(view.view==='elements'){ html += renderElementsView(view.departmentId); ensureElementPhotosLoaded(view.departmentId); }
  else if(view.view==='instances'){ html += renderInstancesView(view.elementId); ensureElementDataLoaded(view.elementId); }
  else if(view.view==='information'){ html += renderInformationView(view.instanceId); ensureInstancePhotosLoaded(view.instanceId); ensureInstanceFilesLoaded(view.instanceId); }
  else if(view.view==='element-notes') html += renderNotesView('element', view.elementId);
  else if(view.view==='instance-notes') html += renderNotesView('instance', view.instanceId);
  else if(view.view==='element-files'){ html += renderElementFilesView(view.elementId); ensureElementDataLoaded(view.elementId); }
  else if(view.view==='instance-files') html += renderInstanceFilesView(view.instanceId);
  else if(view.view==='tech-groups') html += renderTechGroupsView();
  else if(view.view==='tech-group') html += renderTechGroupView(view.groupId);

  html += `<div class="status-line">Dane zapisywane na serwerze (baza MSSQL oraz foldery Zdjęcia, Załączniki i tabele). Regularnie rób kopię zapasową przyciskiem „Eksportuj kopię”.</div>`;

  if(navStack !== stackAtStart) return; // redirected while building: that render is the current one
  app.classList.remove('wide');
  app.innerHTML = html;
  attachHandlers();
  renderSidePanel();
}

function renderTopbar(){
  const section = currentSection();
  return `
    <div class="topbar">
      <div class="brand">Baza&nbsp;wiedzy<br>produkcyjnej</div>
      <div class="topbar-right">
        <div class="search-wrap">
          <input type="text" id="search-input" class="search-input" placeholder="Szukaj: nazwa, indeks, WinKlima, skrót…" value="${esc(searchQuery)}" autocomplete="off">
          ${searchQuery ? renderSearchResults() : ''}
        </div>
        <button class="btn btn-ghost" id="export-btn" title="Pobierz kopię zapasową wszystkich danych jako plik">Eksportuj kopię</button>
        <label class="btn btn-ghost" id="import-btn" style="cursor:pointer;" title="Wczytaj dane z pliku kopii zapasowej">
          Importuj kopię
          <input type="file" accept="application/json" id="import-input" style="display:none;">
        </label>
      </div>
    </div>
    <nav class="main-nav">
      <button class="nav-tab ${section==='production'?'active':''}" data-nav-section="production">Działy produkcyjne</button>
      <button class="nav-tab ${section==='tech'?'active':''}" data-nav-section="tech">Informacje Technologiczne</button>
    </nav>`;
}

function renderSearchResults(){
  const results = searchElements(searchQuery);
  if(results.length===0){
    return `<div class="search-results"><div class="search-empty">Brak wyników dla „${esc(searchQuery)}”.</div></div>`;
  }
  return `<div class="search-results">
    ${results.map(r=>{
      const i = r.instance;
      const codes = i ? [
        i.index ? `Index: ${esc(i.index)}` : '',
        i.winklima ? `WinKlima: ${esc(i.winklima)}` : '',
        i.skrot ? `Skrót: ${esc(i.skrot)}` : ''
      ].filter(Boolean).join(' · ') : '';
      return `
      <div class="search-result-item" data-goto-dept="${r.dept.id}" data-goto-element="${r.element.id}" ${i ? `data-goto-instance="${i.id}"` : ''}>
        <div class="search-result-name">${esc(i ? i.name : r.element.name)}</div>
        <div class="search-result-path mono">${esc(r.dept.name)} &gt; ${esc(r.element.name)}${i ? ` &gt; ${esc(i.name)}` : ''}</div>
        ${codes ? `<div class="search-result-path mono">${codes}</div>` : ''}
      </div>`;
    }).join('')}
  </div>`;
}

function renderDepartmentsView(){
  let html = `
    <div class="section-header">
      <div>
        <h1 class="section-title">Działy produkcyjne</h1>
        <div class="section-sub">Wybierz dział, aby zobaczyć jego elementy.</div>
      </div>
      <button class="btn btn-primary" id="add-dept-btn">+ Dodaj dział</button>
    </div>`;

  if(db.departments.length===0){
    html += `<div class="empty-state">Brak działów. Dodaj pierwszy dział, aby rozpocząć budowę bazy wiedzy.</div>`;
  } else {
    html += `<div class="card-grid">` + db.departments.map(d=>{
      const count = elementsOf(d.id).length;
      const thumb = d.photo
        ? `<img class="card-thumb" src="${d.photo}">`
        : `<label class="card-thumb-placeholder mono" data-add-dept-photo="${d.id}" style="cursor:pointer;" title="Dodaj zdjęcie">
             DZIAŁ
             <input type="file" accept="image/*" data-dept-photo-input="${d.id}" style="display:none;">
           </label>`;
      return `
      <div class="card" data-open-dept="${d.id}">
        ${thumb}
        <p class="card-name">${esc(d.name)}</p>
        <div class="card-meta">${count} ${count===1?'element':'elementów'}</div>
      </div>`;
    }).join('') + `</div>`;
  }
  return html;
}

function renderTechGroupsView(){
  let html = `
    <div class="section-header">
      <div>
        <h1 class="section-title">Informacje Technologiczne</h1>
        <div class="section-sub">Wybierz grupę informacji, aby zobaczyć jej informacje ogólne.</div>
      </div>
      <button class="btn btn-primary" id="add-tech-group-btn">+ Dodaj grupę</button>
    </div>`;
  if(db.techGroups.length===0){
    html += `<div class="empty-state">Brak grup informacji. Dodaj pierwszą grupę, aby zacząć wprowadzać informacje technologiczne.</div>`;
  } else {
    html += `<div class="card-grid">` + db.techGroups.map(g=>{
      const count = techInfosOf(g.id).length;
      return `
      <div class="card" data-open-tech-group="${g.id}">
        <div class="card-thumb-placeholder mono">GRUPA</div>
        <p class="card-name">${esc(g.name)}</p>
        <div class="card-meta">${count} ${count===1?'informacja':'informacji'}</div>
      </div>`;
    }).join('') + `</div>`;
  }
  return html;
}

function renderTechGroupView(groupId){
  const group = getTechGroup(groupId);
  if(!group){ resetTo([{view:'tech-groups'}]); return ''; }
  const infos = techInfosOf(groupId);
  const tables = techTablesOf(groupId);

  let html = `
    <div class="navrow">
      <button class="back-btn" id="back-btn">&larr; Wstecz</button>
      <div class="breadcrumb"><span data-goto-tech-groups style="cursor:pointer;">Informacje Technologiczne</span> &gt; <b>${esc(group.name)}</b></div>
    </div>
    <div class="section-header">
      <div>
        <h1 class="section-title">${esc(group.name)}</h1>
        <div class="section-sub">Informacje ogólne i tabele w tej grupie.</div>
      </div>
      <div class="header-btn-stack">
        <button class="btn btn-ghost" id="edit-tech-group-btn">Edytuj</button>
        <button class="btn btn-ghost" id="del-tech-group-btn">Usuń grupę</button>
        <button class="btn btn-primary" id="add-tech-info-btn">+ Dodaj informację ogólną</button>
      </div>
    </div>`;

  if(infos.length===0){
    html += `<div class="empty-state">Brak informacji w tej grupie.</div>`;
  } else {
    html += infos.map((info, idx)=>`
      <div class="info-card">
        <div class="info-card-head">
          <p class="info-name">${esc(info.name)}${info.optional?'<span class="info-badge">OPCJONALNE</span>':''}</p>
          <div class="row-actions">
            <button class="btn-move" data-move-tech-info="${info.id}" data-move-dir="up" ${idx===0?'disabled':''} title="Przesuń w górę">&uarr;</button>
            <button class="btn-move" data-move-tech-info="${info.id}" data-move-dir="down" ${idx===infos.length-1?'disabled':''} title="Przesuń w dół">&darr;</button>
            <button class="btn-danger-text" data-edit-tech-info="${info.id}">Edytuj</button>
            <button class="btn-danger-text" data-del-tech-info="${info.id}">Usuń</button>
          </div>
        </div>
        ${info.description ? `<div class="info-desc">${esc(info.description)}</div>` : ''}
      </div>`).join('');
  }

  html += `
    <div class="section-header">
      <div>
        <h2 class="section-title" style="font-size:17px;">Tabele</h2>
        <div class="section-sub">Tabele wczytane z plików Excel. Wartości komórek można edytować, struktury tabeli nie.</div>
      </div>
      <button class="btn btn-primary" id="add-tech-table-btn">+ Dodaj tabelę</button>
    </div>`;
  if(tables.length===0){
    html += `<div class="empty-state">Brak tabel w tej grupie.</div>`;
  } else {
    html += tables.map(t=>{
      const date = formatNoteDate(t.date);
      return `
      <div class="info-card">
        <div class="info-card-head">
          <div>
            <p class="info-name">${esc(t.name)}</p>
            ${renderNoteMeta([date && `Data: ${date}`])}
          </div>
          <div class="row-actions">
            <button class="btn-danger-text" data-edit-tech-table="${t.id}">Edytuj</button>
            <button class="btn-danger-text" data-del-tech-table="${t.id}">Usuń</button>
          </div>
        </div>
        ${tableMarkup(t.table, (r, c, v) => esc(v))}
      </div>`;
    }).join('');
  }
  return html;
}

function renderEditMenu({ editId, editLabel, deleteId, deleteLabel }){
  return `
    <div class="edit-menu">
      <div class="edit-menu-split">
        <button class="btn btn-ghost" id="${editId}">${esc(editLabel)}</button>
        <button type="button" class="btn btn-ghost edit-menu-toggle" data-edit-menu-toggle aria-label="Więcej opcji" title="Więcej opcji">▾</button>
      </div>
      <div class="edit-menu-list">
        <button type="button" class="edit-menu-item danger" id="${deleteId}">${esc(deleteLabel)}</button>
      </div>
    </div>`;
}

function renderElementsView(departmentId){
  const dept = getDept(departmentId);
  if(!dept){ resetTo([{view:'departments'}]); return ''; }
  const els = elementsOf(departmentId);

  let html = `
    <div class="navrow">
      <button class="back-btn" id="back-btn">&larr; Wstecz</button>
      <div class="breadcrumb"><b>${esc(dept.name)}</b></div>
    </div>
    <div class="section-header">
      <div>
        <h1 class="section-title">${esc(dept.name)}</h1>
        <div class="section-sub">Elementy produkcyjne w tym dziale.</div>
      </div>
      <div class="header-actions">
        ${renderEditMenu({ editId:'edit-department-btn', editLabel:'Edytuj', deleteId:'del-department-btn', deleteLabel:'Usuń dział' })}
        <button class="btn btn-primary" id="add-element-btn">+ Dodaj element</button>
      </div>
    </div>`;

  if(els.length===0){
    html += `<div class="empty-state">Ten dział nie ma jeszcze elementów. Dodaj pierwszy element.</div>`;
  } else {
    html += `<div class="card-grid">` + els.map(e=>{
      const photos = photoCache[e.id] || [];
      const thumb = photos[0]
        ? `<img class="card-thumb" src="${photos[0]}">`
        : `<div class="card-thumb-placeholder mono">BRAK ZDJĘCIA</div>`;
      const instCount = instancesOf(e.id).length;
      return `
      <div class="card" data-open-element="${e.id}">
        ${thumb}
        <p class="card-name">${esc(e.name)}</p>
        <div class="card-meta">${instCount} ${instCount===1?'instancja':'instancji'}</div>
      </div>`;
    }).join('') + `</div>`;
  }
  return html;
}

function renderFileRows(files, delDataAttr){
  if(files.length===0) return `<div class="empty-state">Brak załączników.</div>`;
  return `<div class="list-rows">` + files.map(f=>`
    <div class="row" style="cursor:default;">
      <div>
        <div class="row-name">📎 ${esc(f.name)}</div>
        <div class="card-meta">${formatFileSize(f.size||0)}</div>
      </div>
      <div class="row-actions">
        <a class="btn btn-ghost" href="${esc(fileHref(f))}" download="${esc(f.name)}" style="text-decoration:none;">Pobierz</a>
        <button class="btn-danger-text" data-${delDataAttr}="${f.id}">Usuń</button>
      </div>
    </div>`).join('') + `</div>`;
}

function renderInstancesView(elementId){
  const el = getElement(elementId);
  if(!el){ resetTo([{view:'departments'}]); return ''; }
  const dept = getDept(el.departmentId);
  const insts = instancesOf(elementId);
  const photos = photoCache[elementId] || [];

  let html = `
    <div class="navrow">
      <button class="back-btn" id="back-btn">&larr; Wstecz</button>
      <div class="breadcrumb"><span data-goto-dept-crumb="${dept.id}" style="cursor:pointer;">${esc(dept.name)}</span> &gt; <b>${esc(el.name)}</b></div>
    </div>
    <div class="section-header">
      <div>
        <h1 class="section-title">${esc(el.name)}</h1>
        <div class="section-sub">Zdjęcia i zestawy informacji (instancje) dla tego elementu.</div>
      </div>
      <div class="header-actions">
        ${renderEditMenu({ editId:'edit-element-btn', editLabel:'Edytuj element', deleteId:'del-element-btn', deleteLabel:'Usuń element' })}
        <button class="btn btn-ghost" id="open-element-notes-btn">Uwagi technologiczne</button>
        <button class="btn btn-ghost" id="open-element-files-btn">Załączniki</button>
      </div>
    </div>

    <div class="photo-strip">
      ${photos.map((p,idx)=>`
        <div class="photo-thumb-wrap">
          <img class="photo-thumb" src="${p}" data-view-photo="${idx}">
          <button class="photo-del" data-del-photo="${idx}" title="Usuń zdjęcie">×</button>
        </div>`).join('')}
      <label class="photo-add-btn" title="Dodaj zdjęcie">
        +
        <input type="file" accept="image/*" id="photo-input" style="display:none;">
      </label>
    </div>

    <div class="section-header">
      <div>
        <h2 class="section-title" style="font-size:17px;">Informacje ogólne</h2>
        <div class="section-sub">Dotyczą całego elementu, niezależnie od instancji.</div>
      </div>
      <button class="btn btn-primary" id="add-element-info-btn">+ Dodaj informację ogólną</button>
    </div>`;

  const elInfos = elementInfosOf(elementId);
  if(elInfos.length===0){
    html += `<div class="empty-state">Brak informacji ogólnych dla tego elementu.</div>`;
  } else {
    html += elInfos.map((info, idx)=>`
      <div class="info-card">
        <div class="info-card-head">
          <p class="info-name">${esc(info.name)}${info.optional?'<span class="info-badge">OPCJONALNE</span>':''}</p>
          <div class="row-actions">
            <button class="btn-move" data-move-el-info="${info.id}" data-move-dir="up" ${idx===0?'disabled':''} title="Przesuń w górę">&uarr;</button>
            <button class="btn-move" data-move-el-info="${info.id}" data-move-dir="down" ${idx===elInfos.length-1?'disabled':''} title="Przesuń w dół">&darr;</button>
            <button class="btn-danger-text" data-edit-el-info="${info.id}">Edytuj</button>
            <button class="btn-danger-text" data-del-el-info="${info.id}">Usuń</button>
          </div>
        </div>
        ${info.description ? `<div class="info-desc">${esc(info.description)}</div>` : ''}
      </div>`).join('');
  }

  html += `
    <div class="section-header">
      <div>
        <h2 class="section-title" style="font-size:17px;">Instancje</h2>
        <div class="section-sub">Nazwane zestawy informacji, np. różne warianty lub konfiguracje elementu.</div>
      </div>
      <button class="btn btn-primary" id="add-instance-btn">+ Dodaj instancję</button>
    </div>`;

  if(insts.length===0){
    html += `<div class="empty-state">Brak instancji. Dodaj pierwszą, aby zacząć wprowadzać informacje o elemencie.</div>`;
  } else {
    html += `<div class="list-rows">` + insts.map(i=>{
      const infoCount = infosOf(i.id).length;
      return `
      <div class="row" data-open-instance="${i.id}">
        <div>
          <div class="row-name">${esc(i.name)}</div>
          <div class="card-meta">${infoCount} ${infoCount===1?'informacja':'informacji'}${[i.index?`Index: ${esc(i.index)}`:'', i.winklima?`WinKlima: ${esc(i.winklima)}`:'', i.skrot?`Skrót: ${esc(i.skrot)}`:''].filter(Boolean).map(t=>' · '+t).join('')}</div>
        </div>
        <div class="row-actions">
          <button class="btn-danger-text" data-del-instance="${i.id}">Usuń</button>
        </div>
      </div>`;
    }).join('') + `</div>`;
  }
  return html;
}

function renderInformationView(instanceId){
  const inst = getInstance(instanceId);
  if(!inst){ resetTo([{view:'departments'}]); return ''; }
  const el = getElement(inst.elementId);
  const dept = getDept(el.departmentId);
  const infos = infosOf(instanceId);
  const instPhotos = instancePhotoCache[instanceId] || [];

  let html = `
    <div class="navrow">
      <button class="back-btn" id="back-btn">&larr; Wstecz</button>
      <div class="breadcrumb">
        <span data-goto-dept-crumb="${dept.id}" style="cursor:pointer;">${esc(dept.name)}</span> &gt;
        <span data-goto-element-crumb="${el.id}" data-goto-dept="${dept.id}" style="cursor:pointer;">${esc(el.name)}</span> &gt;
        <b>${esc(inst.name)}</b>
      </div>
    </div>
    <div class="section-header">
      <div>
        <h1 class="section-title">${esc(inst.name)}</h1>
        <div class="element-meta">
          <div>Index: ${esc(inst.index || '—')}</div>
          <div>Numer WinKlima: ${esc(inst.winklima || '—')}</div>
          <div>Skrót: ${esc(inst.skrot || '—')}</div>
        </div>
        <button class="btn btn-ghost" id="edit-instance-details-btn" style="margin-top:8px;">Edytuj informacje</button>
        <div class="section-sub">Zdjęcia oraz informacje i procesy wprowadzone dla tej instancji.</div>
      </div>
      <div class="header-btn-stack">
        <button class="btn btn-ghost" id="open-instance-notes-btn">Uwagi technologiczne</button>
        <button class="btn btn-ghost" id="open-instance-files-btn">Załączniki</button>
      </div>
    </div>

    <div class="photo-strip">
      ${instPhotos.map((p,idx)=>`
        <div class="photo-thumb-wrap">
          <img class="photo-thumb" src="${p}" data-view-instance-photo="${idx}">
          <button class="photo-del" data-del-instance-photo="${idx}" title="Usuń zdjęcie">×</button>
        </div>`).join('')}
      <label class="photo-add-btn" title="Dodaj zdjęcie instancji">
        +
        <input type="file" accept="image/*" id="instance-photo-input" style="display:none;">
      </label>
    </div>

    <div class="section-header">
      <div>
        <h2 class="section-title" style="font-size:17px;">Informacje i procesy</h2>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-ghost" id="add-process-btn">+ Dodaj proces</button>
        <button class="btn btn-primary" id="add-info-btn">+ Dodaj informację</button>
      </div>
    </div>`;

  if(infos.length===0){
    html += `<div class="empty-state">Brak informacji. Dodaj pierwszą pozycję, np. „Parametry techniczne” lub „Procedura montażu”, albo dodaj proces.</div>`;
  } else {
    html += infos.map((info, idx)=>{
      const isProcess = info.type==='process';
      const badge = isProcess
        ? '<span class="info-badge" style="border-color:var(--steel);color:var(--steel);">PROCES</span>'
        : (info.optional ? '<span class="info-badge">OPCJONALNE</span>' : '');
      return `
      <div class="info-card info-card-with-photo">
        <div class="info-photo-box">
          ${info.photo
            ? `<div class="info-photo-label" style="cursor:zoom-in;" title="Powiększ zdjęcie">
                 <img class="info-photo-img" src="${info.photo}" data-view-info-photo="${info.id}">
               </div>`
            : `<label class="info-photo-label" title="Dodaj zdjęcie">
                 <span class="info-photo-plus">+</span>
                 <input type="file" accept="image/*" data-info-photo-input="${info.id}" style="display:none;">
               </label>`}
        </div>
        <div class="info-card-body">
          <div class="info-card-head">
            <p class="info-name">${esc(info.name)}${badge}</p>
            <div class="row-actions">
              <button class="btn-move" data-move-info="${info.id}" data-move-dir="up" ${idx===0?'disabled':''} title="Przesuń w górę">&uarr;</button>
              <button class="btn-move" data-move-info="${info.id}" data-move-dir="down" ${idx===infos.length-1?'disabled':''} title="Przesuń w dół">&darr;</button>
              <button class="btn-danger-text" data-edit-info="${info.id}">Edytuj</button>
              <button class="btn-danger-text" data-del-info="${info.id}">Usuń</button>
            </div>
          </div>
          ${info.description ? `<div class="info-desc">${esc(info.description)}</div>` : ''}
        </div>
      </div>`;
    }).join('');
  }
  return html;
}

function renderNoteMeta(parts){
  const items = parts.filter(Boolean);
  return items.length ? `<div class="note-meta">${items.join(' · ')}</div>` : '';
}

/* "Odnośniki: [place] [place]" at the bottom of a note; buttons show only the target's own name. */
function renderNoteLinks(note){
  const items = validLinks(note.links).map(l => ({ l, r: resolveLink(l) }));
  if(!items.length) return '';
  return `<div class="note-links"><span class="note-links-label">Odnośniki:</span>${items.map(({ l, r }) =>
    `<button class="note-link-btn${sidePanelLink && sidePanelLink.type === l.type && sidePanelLink.id === l.id ? ' active' : ''}" data-note-link-type="${l.type}" data-note-link-id="${esc(l.id)}" title="${esc(linkTitle(r))}">${esc(r.name)}</button>`).join('')}</div>`;
}

function renderGeneralNoteCard(note, idx, count){
  const date = formatNoteDate(note.date);
  return `
    <div class="info-card">
      <div class="info-card-head">
        <div>
          <p class="info-name">${esc(note.name)}</p>
          ${renderNoteMeta([date && `Data: ${date}`])}
        </div>
        <div class="row-actions">
          <button class="btn-move" data-move-note="${note.id}" data-move-dir="up" ${idx===0?'disabled':''} title="Przesuń w górę">&uarr;</button>
          <button class="btn-move" data-move-note="${note.id}" data-move-dir="down" ${idx===count-1?'disabled':''} title="Przesuń w dół">&darr;</button>
          <button class="btn-danger-text" data-edit-note="${note.id}">Edytuj</button>
          <button class="btn-danger-text" data-del-note="${note.id}">Usuń</button>
        </div>
      </div>
      ${note.description ? `<div class="info-desc">${esc(note.description)}</div>` : ''}
      ${renderNoteLinks(note)}
    </div>`;
}

/* "Instrukcja ogólna": fixed title, content only, no arrows. */
function renderInstructionCard(note){
  const date = formatNoteDate(note.date);
  return `
    <div class="info-card">
      <div class="info-card-head">
        <div>
          <p class="info-name">INSTRUKCJA OGÓLNA</p>
          ${renderNoteMeta([date && `Data: ${date}`])}
        </div>
        <div class="row-actions">
          <button class="btn-danger-text" data-edit-note="${note.id}">Edytuj</button>
          <button class="btn-danger-text" data-del-note="${note.id}">Usuń</button>
        </div>
      </div>
      ${note.description ? `<div class="info-desc">${esc(note.description)}</div>` : ''}
      ${renderNoteLinks(note)}
    </div>`;
}

/* No arrows here: creation notes are ordered by diameter automatically. */
function renderCreationNoteCard(note){
  const date = formatNoteDate(note.date);
  return `
    <div class="info-card">
      <div class="info-card-head">
        <div>
          <p class="info-name">Ø ${esc(formatDiameter(note.diameter))}</p>
          ${renderNoteMeta([
            note.client && `Klient: ${esc(note.client)}`,
            note.za && `ZA: ${esc(note.za)}`,
            date && `Data: ${date}`
          ])}
        </div>
        <div class="row-actions">
          <button class="btn-danger-text" data-edit-note="${note.id}">Edytuj</button>
          <button class="btn-danger-text" data-del-note="${note.id}">Usuń</button>
        </div>
      </div>
      ${note.description ? `<div class="info-desc">${esc(note.description)}</div>` : ''}
      ${renderNoteLinks(note)}
    </div>`;
}

/* One notes screen for both levels: scope 'element' or 'instance'.
 * The single general instruction comes first, then general notes, then
 * creation notes (sorted by diameter). */
function renderNotesView(scope, ownerId){
  let el, inst = null;
  if(scope === 'element'){
    el = getElement(ownerId);
  } else {
    inst = getInstance(ownerId);
    el = inst ? getElement(inst.elementId) : null;
  }
  if(!el){ resetTo([{view:'departments'}]); return ''; }
  const dept = getDept(el.departmentId);

  const crumbLast = inst ? `Uwagi technologiczne — ${esc(inst.name)}` : 'Uwagi technologiczne';
  const sub = inst ? `Dotyczą instancji „${esc(inst.name)}”.` : `Dotyczą elementu „${esc(el.name)}”.`;
  const general = generalNotesOf(scope, ownerId);
  const creation = creationNotesOf(scope, ownerId);
  const instruction = instructionOf(scope, ownerId);

  let html = `
    <div class="navrow">
      <button class="back-btn" id="back-btn">&larr; Wstecz</button>
      <div class="breadcrumb">
        <span data-goto-dept-crumb="${dept.id}" style="cursor:pointer;">${esc(dept.name)}</span> &gt;
        <span data-goto-element-crumb="${el.id}" data-goto-dept="${dept.id}" style="cursor:pointer;">${esc(el.name)}</span> &gt;
        <b>${crumbLast}</b>
      </div>
    </div>
    <div class="section-header">
      <div>
        <h1 class="section-title">Uwagi technologiczne</h1>
        <div class="section-sub">${sub}</div>
      </div>
      <button class="btn btn-primary" id="add-note-btn">+ Dodaj uwagę</button>
    </div>

    ${instruction ? renderInstructionCard(instruction) : ''}

    <h2 class="note-section-title">Uwagi ogólne</h2>
    ${general.length
      ? general.map((n, i) => renderGeneralNoteCard(n, i, general.length)).join('')
      : '<div class="empty-state">Brak uwag ogólnych.</div>'}

    <h2 class="note-section-title">Uwagi do tworzenia elementu</h2>
    ${creation.length
      ? creation.map(renderCreationNoteCard).join('')
      : '<div class="empty-state">Brak uwag do tworzenia elementu.</div>'}`;
  return html;
}

function renderElementFilesView(elementId){
  const el = getElement(elementId);
  if(!el){ resetTo([{view:'departments'}]); return ''; }
  const dept = getDept(el.departmentId);
  const files = elementFilesCache[elementId] || [];

  let html = `
    <div class="navrow">
      <button class="back-btn" id="back-btn">&larr; Wstecz</button>
      <div class="breadcrumb">
        <span data-goto-dept-crumb="${dept.id}" style="cursor:pointer;">${esc(dept.name)}</span> &gt;
        <span data-goto-element-crumb="${el.id}" data-goto-dept="${dept.id}" style="cursor:pointer;">${esc(el.name)}</span> &gt;
        <b>Załączniki</b>
      </div>
    </div>
    <div class="section-header">
      <div>
        <h1 class="section-title">Załączniki</h1>
        <div class="section-sub">Dowolne pliki powiązane z elementem „${esc(el.name)}”.</div>
      </div>
      <label class="btn btn-primary" style="cursor:pointer;">
        + Dodaj załącznik
        <input type="file" multiple id="element-file-input" style="display:none;">
      </label>
    </div>
    ${renderFileRows(files, 'del-el-file')}`;
  return html;
}

function renderInstanceFilesView(instanceId){
  const inst = getInstance(instanceId);
  if(!inst){ resetTo([{view:'departments'}]); return ''; }
  const el = getElement(inst.elementId);
  const dept = getDept(el.departmentId);
  const files = instanceFilesCache[instanceId] || [];

  let html = `
    <div class="navrow">
      <button class="back-btn" id="back-btn">&larr; Wstecz</button>
      <div class="breadcrumb">
        <span data-goto-dept-crumb="${dept.id}" style="cursor:pointer;">${esc(dept.name)}</span> &gt;
        <span data-goto-element-crumb="${el.id}" data-goto-dept="${dept.id}" style="cursor:pointer;">${esc(el.name)}</span> &gt;
        <b>Załączniki — ${esc(inst.name)}</b>
      </div>
    </div>
    <div class="section-header">
      <div>
        <h1 class="section-title">Załączniki</h1>
        <div class="section-sub">Dowolne pliki powiązane z instancją „${esc(inst.name)}”.</div>
      </div>
      <label class="btn btn-primary" style="cursor:pointer;">
        + Dodaj załącznik
        <input type="file" multiple id="instance-file-input" style="display:none;">
      </label>
    </div>
    ${renderFileRows(files, 'del-inst-file')}`;
  return html;
}
