/* ===== js/state.js ===== */
/*
 * state.js — In-memory application state and the data-access ("repository")
 * helpers built on top of it: the db object, navigation stack, in-memory
 * photo/file caches, and every getX/moveX helper used by render.js and
 * handlers.js. No DOM access happens here except via render()/currentView(),
 * which are the two seams the rest of the app calls back into.
 */

let db = { departments: [], elements: [], instances: [], informations: [], elementInformations: [], elementNotes: [], instanceNotes: [], techGroups: [], techInfos: [], techTables: [] };
let navStack = [{ view: 'departments' }];
let searchQuery = '';
let dataLoaded = false;
let storageAvailable = true;
let stateVersion = 0;

function uid(prefix){
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

/* in-memory photo/file cache per element / instance for current session */
/* in-memory photo cache per element / instance for current session */
let photoCache = {};
let instancePhotoCache = {};
let elementFilesCache = {};
let instanceFilesCache = {};

/* ---------------- Nav helpers ---------------- */
function currentView(){ return navStack[navStack.length-1]; }
/* Every navigation also adds a browser history entry, so the browser's Back /
 * Forward buttons (and mouse side buttons) walk through the places visited.
 * The entry stores the whole view stack. The URL is left untouched, so this
 * works for a downloaded file opened from disk as well. */
let rendering = false;

function applyNavStack(stack, replace){
  navStack = stack;
  try{
    const state = { pkb: 1, stack: JSON.parse(JSON.stringify(stack)) };
    // while rendering, a redirect (e.g. deleted target) replaces the entry instead of adding one
    if(replace || rendering) history.replaceState(state, '');
    else history.pushState(state, '');
  }catch(e){}
}

function commitNav(stack, replace){
  searchQuery = '';
  applyNavStack(stack, replace);
  render();
}
function pushView(v){ commitNav(navStack.concat([v])); }
function goBack(){ if(navStack.length>1) commitNav(navStack.slice(0, -1)); }
function resetTo(stack){ commitNav(stack); }

function sectionRootFrame(){
  return currentSection() === 'tech' ? { view: 'tech-groups' } : { view: 'departments' };
}

function isViewFrameValid(frame){
  if(!frame || !frame.view) return false;
  switch(frame.view){
    case 'departments':
    case 'tech-groups':
      return true;
    case 'elements':
      return !!getDept(frame.departmentId);
    case 'instances':
    case 'element-notes':
    case 'element-files':
      return !!getElement(frame.elementId);
    case 'information':
    case 'instance-notes':
    case 'instance-files':
      return !!getInstance(frame.instanceId);
    case 'tech-group':
      return !!getTechGroup(frame.groupId);
    default:
      return false;
  }
}

/* Keep as much of the current path as still exists. Does not jump to home
 * unless every deeper frame disappeared (e.g. the department itself). */
function sanitizeNavStack(){
  const kept = [];
  for(const frame of navStack){
    if(!isViewFrameValid(frame)) break;
    kept.push(frame);
  }
  if(!kept.length) kept.push(sectionRootFrame());
  if(JSON.stringify(kept) === JSON.stringify(navStack)) return false;
  applyNavStack(kept, true);
  return true;
}

function retreatFromMissingView(){
  sanitizeNavStack();
  render();
}

/* Re-render after a remote update: same page, same search, same scroll. */
function renderCurrentViewInPlace(){
  const left = sanitizeNavStack();
  const searchEl = document.getElementById('search-input');
  const searchFocused = !!(searchEl && document.activeElement === searchEl);
  const searchPos = searchEl ? searchEl.selectionStart : 0;
  const scrollY = window.scrollY;
  const panel = document.getElementById('side-panel');
  const panelScroll = panel ? panel.scrollTop : 0;
  render();
  window.scrollTo(0, scrollY);
  if(panel) panel.scrollTop = panelScroll;
  if(searchFocused){
    const again = document.getElementById('search-input');
    if(again){
      again.focus();
      try{ again.setSelectionRange(searchPos, searchPos); }catch(e){}
    }
  }
  if(left) showToast('Ten widok został usunięty przez innego użytkownika.');
}

function stackFromHistoryState(state){
  return state && state.pkb && Array.isArray(state.stack) && state.stack.length ? state.stack : null;
}
window.addEventListener('popstate', (e)=>{
  navStack = stackFromHistoryState(e.state) || [{ view: 'departments' }];
  searchQuery = '';
  closeModal();
  render();
});

function getDept(id){ return db.departments.find(d=>d.id===id); }
function getElement(id){ return db.elements.find(e=>e.id===id); }
function getInstance(id){ return db.instances.find(i=>i.id===id); }
function elementsOf(deptId){ return db.elements.filter(e=>e.departmentId===deptId); }
function instancesOf(elId){ return db.instances.filter(i=>i.elementId===elId); }
function infosOf(instId){ return db.informations.filter(i=>i.instanceId===instId); }
function moveInfo(instanceId, id, direction){
  const list = infosOf(instanceId);
  const idx = list.findIndex(i=>i.id===id);
  const swapIdx = direction==='up' ? idx-1 : idx+1;
  if(idx===-1 || swapIdx<0 || swapIdx>=list.length) return false;
  const item = list[idx];
  const other = list[swapIdx];
  const realIdxItem = db.informations.indexOf(item);
  const realIdxOther = db.informations.indexOf(other);
  db.informations[realIdxItem] = other;
  db.informations[realIdxOther] = item;
  return true;
}
function processCountForInstance(instanceId){
  return db.informations.filter(i=>i.type==='process' && i.instanceId===instanceId).length;
}

function elementInfosOf(elementId){ return db.elementInformations.filter(i=>i.elementId===elementId); }
function moveElementInfo(elementId, id, direction){
  const list = elementInfosOf(elementId);
  const idx = list.findIndex(i=>i.id===id);
  const swapIdx = direction==='up' ? idx-1 : idx+1;
  if(idx===-1 || swapIdx<0 || swapIdx>=list.length) return false;
  const item = list[idx];
  const other = list[swapIdx];
  const realIdxItem = db.elementInformations.indexOf(item);
  const realIdxOther = db.elementInformations.indexOf(other);
  db.elementInformations[realIdxItem] = other;
  db.elementInformations[realIdxOther] = item;
  return true;
}

/* ---------------- Informacje technologiczne (groups of general information) ---------------- */
function getTechGroup(id){ return db.techGroups.find(g=>g.id===id); }
function techInfosOf(groupId){ return db.techInfos.filter(i=>i.groupId===groupId); }
function moveTechInfo(groupId, id, direction){
  const list = techInfosOf(groupId);
  const idx = list.findIndex(i=>i.id===id);
  const swapIdx = direction==='up' ? idx-1 : idx+1;
  if(idx===-1 || swapIdx<0 || swapIdx>=list.length) return false;
  const a = db.techInfos.indexOf(list[idx]);
  const b = db.techInfos.indexOf(list[swapIdx]);
  [db.techInfos[a], db.techInfos[b]] = [db.techInfos[b], db.techInfos[a]];
  return true;
}
function techTablesOf(groupId){ return db.techTables.filter(t=>t.groupId===groupId); }

/* True when the buffer really is an Excel file: .xlsx/.xlsm are zip archives
 * ("PK"), .xls is an OLE2 container. SheetJS would otherwise happily read any
 * text file as a one-cell sheet. */
function isExcelBuffer(buf){
  const b = new Uint8Array(buf.slice(0, 4));
  return (b[0] === 0x50 && b[1] === 0x4B) || (b[0] === 0xD0 && b[1] === 0xCF && b[2] === 0x11 && b[3] === 0xE0);
}

/* ---- Tables read from Excel (Informacje Technologiczne) ----
 * table = { rows: string[][], merges: [{r, c, rs, cs}], widths: number[] (0 = auto) }
 * Row 0 is the header. Only the cell text is kept, never the Excel file. */
const TABLE_MAX_ROWS = 300, TABLE_MAX_COLS = 40;

function sheetToTable(ws){
  const ref = ws['!ref'];
  if(!ref) return { rows: [], merges: [], widths: [] };
  const range = XLSX.utils.decode_range(ref);
  let rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: '', blankrows: true });
  rows = rows.map(r => r.map(c => String(c == null ? '' : c)));
  let nRows = 0, nCols = 0;
  rows.forEach((r, ri) => r.forEach((c, ci) => { if(c !== ''){ nRows = Math.max(nRows, ri + 1); nCols = Math.max(nCols, ci + 1); } }));
  const merges = (ws['!merges'] || []).map(m => ({ r: m.s.r - range.s.r, c: m.s.c - range.s.c, rs: m.e.r - m.s.r + 1, cs: m.e.c - m.s.c + 1 }))
    .filter(m => m.r >= 0 && m.c >= 0 && m.r < nRows && m.c < nCols && (m.rs > 1 || m.cs > 1))
    .map(m => ({ r: m.r, c: m.c, rs: Math.min(m.rs, nRows - m.r), cs: Math.min(m.cs, nCols - m.c) }));
  rows = rows.slice(0, nRows).map(r => { const row = r.slice(0, nCols); while(row.length < nCols) row.push(''); return row; });
  const cols = ws['!cols'] || [];
  const widths = [];
  for(let c = 0; c < nCols; c++){
    const col = cols[range.s.c + c] || {};
    const w = col.wch || (col.wpx ? col.wpx / 7 : 0);
    widths.push(w ? Math.round(Math.min(Math.max(w, 6), 60)) : 0);
  }
  return { rows, merges, widths, headerRows: 1 };
}

/* Shared table markup (read-only view, preview and edit grid).
 * cellHtml(r, c, text) returns the inner HTML of a cell. */
function headerRowCount(table){
  const n = table.headerRows;
  return Number.isInteger(n) && n >= 0 ? Math.min(n, (table.rows || []).length) : 1; // tables saved before: 1 header row
}

/* Rows 0..headerRows-1 go to <thead> (kept in view while scrolling), the rest to <tbody>.
 * opts.leading(r) adds a first column (used for the header-row checkboxes). */
function tableMarkup(table, cellHtml, opts){
  const rows = table.rows || [];
  const h = headerRowCount(table);
  const spans = new Map(), covered = new Set();
  // a merge cannot reach across the <thead>/<tbody> border: cut it at the border
  (table.merges || []).map(m => (m.r < h && m.r + m.rs > h) ? { ...m, rs: h - m.r } : m).forEach(m => {
    spans.set(m.r + ',' + m.c, m);
    for(let r = m.r; r < m.r + m.rs; r++) for(let c = m.c; c < m.c + m.cs; c++){
      if(r !== m.r || c !== m.c) covered.add(r + ',' + c);
    }
  });
  const cell = (tag, r, c) => {
    if(covered.has(r + ',' + c)) return '';
    const m = spans.get(r + ',' + c);
    const attrs = m ? ` rowspan="${m.rs}" colspan="${m.cs}"` : '';
    return `<${tag}${attrs}>${cellHtml(r, c, rows[r][c])}</${tag}>`;
  };
  const cols = rows.length ? rows[0].length : 0;
  const widths = table.widths || [];
  const lead = opts && opts.leading;
  const colgroup = '<colgroup>' + (lead ? '<col style="width:34px">' : '') + Array.from({ length: cols }, (_, c) => widths[c] ? `<col style="width:${widths[c]}ch">` : '<col>').join('') + '</colgroup>';
  const rowHtml = (r, tag) => '<tr>' + (lead ? `<${tag} class="hdr-select">${lead(r)}</${tag}>` : '') + rows[r].map((_, c) => cell(tag, r, c)).join('') + '</tr>';
  const head = h > 0 ? '<thead>' + rows.slice(0, h).map((_, r) => rowHtml(r, 'th')).join('') + '</thead>' : '';
  const body = '<tbody>' + rows.slice(h).map((_, i) => rowHtml(h + i, 'td')).join('') + '</tbody>';
  return `<div class="note-table-wrap"><table class="excel-table">${colgroup}${head}${body}</table></div>`;
}

/* Defensive: a hand-edited backup may contain ragged rows or non-text cells. */
function tableFromImport(t){
  t = t || {};
  let rows = (Array.isArray(t.wiersze) ? t.wiersze : []).slice(0, TABLE_MAX_ROWS)
    .map(r => (Array.isArray(r) ? r : []).slice(0, TABLE_MAX_COLS).map(c => String(c == null ? '' : c)));
  const nCols = rows.reduce((m, r) => Math.max(m, r.length), 0);
  rows = rows.map(r => { while(r.length < nCols) r.push(''); return r; });
  const merges = (Array.isArray(t.scaloneKomorki) ? t.scaloneKomorki : []).map(m => ({ r: +m.wiersz, c: +m.kolumna, rs: +m.wierszy, cs: +m.kolumn }))
    .filter(m => [m.r, m.c, m.rs, m.cs].every(Number.isInteger) && m.r >= 0 && m.c >= 0 && m.rs >= 1 && m.cs >= 1 && m.r + m.rs <= rows.length && m.c + m.cs <= nCols && (m.rs > 1 || m.cs > 1));
  const widths = Array.from({ length: nCols }, (_, c) => { const w = +(t.szerokosciKolumn || [])[c]; return w > 0 ? Math.min(w, 60) : 0; });
  const hr = Number.isInteger(t.naglowekWiersze) && t.naglowekWiersze >= 0 ? Math.min(t.naglowekWiersze, rows.length) : 1;
  return { rows, merges, widths, headerRows: hr };
}

/* Which top-menu tab is active: decided by the first view of the stack. */
function currentSection(){
  const root = navStack[0] && navStack[0].view;
  return root==='tech-groups' ? 'tech' : 'production';
}

/* ---------------- Technological notes ----------------
 * Element-level and instance-level notes share one shape and one set of
 * helpers; `scope` ('element' | 'instance') picks the right list.
 *   kind 'general'  : { name, description }
 *   kind 'creation' : { diameter (number), description, client?, za? }
 * Every note carries `date` (ISO string): set when the note is created and
 * refreshed whenever an edit actually changes something. Notes saved before
 * kinds existed have no `kind`/`date`: they are treated as general notes
 * without a date. */
const NOTE_KIND_GENERAL = 'general';
const NOTE_KIND_CREATION = 'creation';
const NOTE_KIND_INSTRUCTION = 'instruction'; // "Instrukcja ogólna": content only, at most one per owner
const NOTE_SCOPES = {
  element:  { list: 'elementNotes',  ownerKey: 'elementId',  idPrefix: 'elnote' },
  instance: { list: 'instanceNotes', ownerKey: 'instanceId', idPrefix: 'instnote' },
};

function nowIso(){ return new Date().toISOString(); }

/* ---- Links from notes to places in the app ----
 * note.links = [{ type: 'department' | 'element' | 'instance' | 'techgroup', id }]
 * Only kinds "do tworzenia elementu" and "ogólne" have links. A link whose
 * target was deleted simply stops resolving and is not shown. */
function resolveLink(link){
  if(!link) return null;
  if(link.type === 'department'){
    const d = getDept(link.id);
    return d ? { root: 'Działy produkcyjne', name: d.name, path: [d.name], stack: [{view:'departments'}, {view:'elements', departmentId:d.id}] } : null;
  }
  if(link.type === 'element'){
    const e = getElement(link.id), d = e && getDept(e.departmentId);
    return d ? { root: 'Działy produkcyjne', name: e.name, path: [d.name, e.name], stack: [{view:'departments'}, {view:'elements', departmentId:d.id}, {view:'instances', elementId:e.id}] } : null;
  }
  if(link.type === 'instance'){
    const i = getInstance(link.id), e = i && getElement(i.elementId), d = e && getDept(e.departmentId);
    return d ? { root: 'Działy produkcyjne', name: i.name, path: [d.name, e.name, i.name], stack: [{view:'departments'}, {view:'elements', departmentId:d.id}, {view:'instances', elementId:e.id}, {view:'information', instanceId:i.id}] } : null;
  }
  if(link.type === 'techgroup'){
    const g = getTechGroup(link.id);
    return g ? { root: 'Informacje Technologiczne', name: g.name, path: [g.name], stack: [{view:'tech-groups'}, {view:'tech-group', groupId:g.id}] } : null;
  }
  return null;
}
/* Only the links that still point somewhere, as plain {type, id}. */
/* Full path for tooltips, including the section the place belongs to. */
function linkTitle(r){ return [r.root, ...r.path].join(' › '); }
function validLinks(links){
  return (links || []).filter(l => resolveLink(l)).map(l => ({ type: l.type, id: l.id }));
}
/* Every place a link can point to, in the order shown in the picker. */
function allLinkTargets(){
  const targets = [];
  const add = (type, id, path) => targets.push({ type, id, name: path[path.length - 1], text: path.join(' › ') });
  db.techGroups.forEach(g => add('techgroup', g.id, ['Informacje Technologiczne', g.name]));
  db.departments.forEach(d => {
    add('department', d.id, ['Działy produkcyjne', d.name]);
    elementsOf(d.id).forEach(e => {
      add('element', e.id, ['Działy produkcyjne', d.name, e.name]);
      instancesOf(e.id).forEach(i => add('instance', i.id, ['Działy produkcyjne', d.name, e.name, i.name]));
    });
  });
  return targets;
}
/* ---- Side panel: shows what a link points to, read-only ----
 * No navigation inside the panel (nothing in it is clickable except the X);
 * it stays open while the main view is used, until it is closed. */
let sidePanelLink = null;

function openSidePanel(link){
  if(!resolveLink(link)){ showToast('To miejsce nie istnieje już w bazie.'); return; }
  sidePanelLink = { type: link.type, id: link.id };
  render();
}
function closeSidePanel(){
  sidePanelLink = null;
  render();
}

function panelInfoCard(info){
  const badge = info.type === 'process'
    ? '<span class="info-badge" style="border-color:var(--steel);color:var(--steel);">PROCES</span>'
    : (info.optional ? '<span class="info-badge">OPCJONALNE</span>' : '');
  return `
    <div class="info-card">
      ${info.photo ? `<img class="panel-info-photo" src="${info.photo}" alt="">` : ''}
      <p class="info-name">${esc(info.name)}${badge}</p>
      ${info.description ? `<div class="info-desc">${esc(info.description)}</div>` : ''}
    </div>`;
}
/* A note without buttons or links: title, small meta line, text. */
function panelNoteCard(note){
  const date = formatNoteDate(note.date);
  let title, meta;
  if(note.kind === NOTE_KIND_INSTRUCTION){ title = 'INSTRUKCJA OGÓLNA'; meta = [date && `Data: ${date}`]; }
  else if(note.kind === NOTE_KIND_CREATION){
    title = `Ø ${esc(formatDiameter(note.diameter))}`;
    meta = [note.client && `Klient: ${esc(note.client)}`, note.za && `ZA: ${esc(note.za)}`, date && `Data: ${date}`];
  } else { title = esc(note.name); meta = [date && `Data: ${date}`]; }
  return `
    <div class="info-card">
      <p class="info-name">${title}</p>
      ${renderNoteMeta(meta)}
      ${note.description ? `<div class="info-desc">${esc(note.description)}</div>` : ''}
    </div>`;
}
function panelNotes(scope, ownerId){
  const notes = [].concat(
    notesOf(scope, ownerId).filter(n => n.kind === NOTE_KIND_INSTRUCTION),
    generalNotesOf(scope, ownerId),
    creationNotesOf(scope, ownerId));
  return notes.length ? `<div class="panel-heading">Uwagi technologiczne</div>${notes.map(panelNoteCard).join('')}` : '';
}

function sidePanelBody(link){
  const empty = text => `<div class="empty-state">${text}</div>`;
  if(link.type === 'techgroup'){
    const infos = techInfosOf(link.id), tables = techTablesOf(link.id);
    return (infos.length ? infos.map(panelInfoCard).join('') : '')
      + (tables.length ? `<div class="panel-heading">Tabele</div>` + tables.map(t => {
          const date = formatNoteDate(t.date);
          return `<div class="info-card"><p class="info-name">${esc(t.name)}</p>${renderNoteMeta([date && `Data: ${date}`])}${tableMarkup(t.table, (r, c, v) => esc(v))}</div>`;
        }).join('') : '')
      + (!infos.length && !tables.length ? empty('Ta grupa nie ma jeszcze informacji.') : '');
  }
  if(link.type === 'instance'){
    const inst = getInstance(link.id), infos = infosOf(link.id);
    const codes = [inst.index && `Index: ${esc(inst.index)}`, inst.winklima && `Numer WinKlima: ${esc(inst.winklima)}`, inst.skrot && `Skrót: ${esc(inst.skrot)}`].filter(Boolean);
    return (codes.length ? `<div class="element-meta">${codes.map(c => `<div>${c}</div>`).join('')}</div>` : '')
      + `<div class="panel-heading">Informacje i procesy</div>`
      + (infos.length ? infos.map(panelInfoCard).join('') : empty('Brak informacji.'))
      + panelNotes('instance', link.id);
  }
  if(link.type === 'element'){
    const infos = elementInfosOf(link.id), insts = instancesOf(link.id);
    return (infos.length ? `<div class="panel-heading">Informacje ogólne</div>${infos.map(panelInfoCard).join('')}` : '')
      + panelNotes('element', link.id)
      + `<div class="panel-heading">Instancje</div>`
      + (insts.length ? `<ul class="panel-list">${insts.map(i => `<li>${esc(i.name)}</li>`).join('')}</ul>` : empty('Brak instancji.'));
  }
  // department
  const els = elementsOf(link.id);
  return `<div class="panel-heading">Elementy</div>`
    + (els.length ? `<ul class="panel-list">${els.map(e => `<li>${esc(e.name)} (${instancesOf(e.id).length})</li>`).join('')}</ul>` : empty('Brak elementów.'));
}

/* Drawn after every render(); closes itself when its target no longer exists. */
function renderSidePanel(){
  const panel = document.getElementById('side-panel');
  const r = sidePanelLink && resolveLink(sidePanelLink);
  if(sidePanelLink && !r) sidePanelLink = null;
  document.body.classList.toggle('panel-open', !!sidePanelLink);
  panel.classList.toggle('open', !!sidePanelLink);
  panel.setAttribute('aria-hidden', sidePanelLink ? 'false' : 'true');
  if(!sidePanelLink) return; // content stays until the slide-out ends, then is replaced on next open
  const scroll = panel.scrollTop;
  panel.innerHTML = `
    <button class="panel-close" id="panel-close-btn" title="Zamknij panel" aria-label="Zamknij panel">×</button>
    <div class="panel-kicker">${esc(r.root)}</div>
    <h2 class="panel-title">${esc(r.name)}</h2>
    <div class="panel-sub">${esc(r.path.join(' › '))}</div>
    ${sidePanelBody(sidePanelLink)}`;
  panel.scrollTop = scroll;
  document.getElementById('panel-close-btn').addEventListener('click', closeSidePanel);
}
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && sidePanelLink && !document.getElementById('modal-root').innerHTML.trim()) closeSidePanel();
});
const LINK_EXPORT_TYPES = { department: 'dzial', element: 'element', instance: 'instancja', techgroup: 'grupa' };
function linksToExport(links){
  return validLinks(links).map(l => ({ typ: LINK_EXPORT_TYPES[l.type], sciezka: resolveLink(l).path }));
}
/* Imported links name their target by path; ids are new after an import. */
function resolveImportedLinks(newDb){
  const find = (list, pred) => list.find(pred);
  const one = node => {
    const [a, b, c] = Array.isArray(node.sciezka) ? node.sciezka : [];
    if(node.typ === 'grupa'){ const g = find(newDb.techGroups, x => x.name === a); return g && { type: 'techgroup', id: g.id }; }
    const d = find(newDb.departments, x => x.name === a);
    if(!d) return null;
    if(node.typ === 'dzial') return { type: 'department', id: d.id };
    const e = find(newDb.elements, x => x.departmentId === d.id && x.name === b);
    if(!e) return null;
    if(node.typ === 'element') return { type: 'element', id: e.id };
    const i = find(newDb.instances, x => x.elementId === e.id && x.name === c);
    return node.typ === 'instancja' && i ? { type: 'instance', id: i.id } : null;
  };
  for(const n of newDb.elementNotes.concat(newDb.instanceNotes)){
    if(n._links){ n.links = n._links.map(one).filter(Boolean); delete n._links; }
  }
}

function notesOf(scope, ownerId){
  const s = NOTE_SCOPES[scope];
  return db[s.list].filter(n => n[s.ownerKey] === ownerId);
}

/* General notes keep the manual order set with the arrows. */
function generalNotesOf(scope, ownerId){
  return notesOf(scope, ownerId).filter(n => n.kind !== NOTE_KIND_CREATION && n.kind !== NOTE_KIND_INSTRUCTION);
}

/* The single "Instrukcja ogólna" of an element / instance (or undefined). */
function instructionOf(scope, ownerId){
  return notesOf(scope, ownerId).find(n => n.kind === NOTE_KIND_INSTRUCTION);
}

/* Keeps only the first instruction per owner (guards imported files). */
function keepSingleInstruction(list, ownerKey){
  const seen = new Set();
  return list.filter(n => {
    if(n.kind !== NOTE_KIND_INSTRUCTION) return true;
    if(seen.has(n[ownerKey])) return false;
    seen.add(n[ownerKey]);
    return true;
  });
}

/* Creation notes are sorted automatically: smallest diameter first,
 * notes with the same diameter oldest first. */
function creationNotesOf(scope, ownerId){
  return notesOf(scope, ownerId)
    .filter(n => n.kind === NOTE_KIND_CREATION)
    .sort((a, b) => (a.diameter - b.diameter) || String(a.date || '').localeCompare(String(b.date || '')));
}

/* Swaps a general note with its neighbour (creation notes have no manual order). */
function moveGeneralNote(scope, ownerId, id, direction){
  const list = generalNotesOf(scope, ownerId);
  const idx = list.findIndex(n => n.id === id);
  const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
  if(idx === -1 || swapIdx < 0 || swapIdx >= list.length) return false;
  const all = db[NOTE_SCOPES[scope].list];
  const i = all.indexOf(list[idx]);
  const j = all.indexOf(list[swapIdx]);
  [all[i], all[j]] = [all[j], all[i]];
  return true;
}

/* Accepts "12", "12,5" or "12.5"; anything else (or a value <= 0) -> NaN. */
function parseDiameter(text){
  const s = String(text == null ? '' : text).trim().replace(',', '.');
  if(!/^\d+(\.\d+)?$/.test(s)) return NaN;
  const n = parseFloat(s);
  return n > 0 ? n : NaN;
}
function formatDiameter(n){ return String(n).replace('.', ','); }

/* dd.mm.yyyy hh:mm (local time); '' when there is no valid date. */
function formatNoteDate(iso){
  if(!iso) return '';
  const d = new Date(iso);
  if(isNaN(d.getTime())) return '';
  const p = x => String(x).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/* `vals` is what openNoteModal() hands to onSave:
 * { kind, name, description, diameter, client, za } */
function assignNoteFields(note, vals){
  note.description = vals.description;
  note.links = validLinks(vals.links);
  if(note.kind === NOTE_KIND_INSTRUCTION){
    return; // content (+ links) only
  }
  if(note.kind === NOTE_KIND_CREATION){
    note.diameter = vals.diameter;
    note.client = vals.client;
    note.za = vals.za;
  } else {
    note.name = vals.name;
  }
}

function createNote(scope, ownerId, vals){
  const s = NOTE_SCOPES[scope];
  if(vals.kind === NOTE_KIND_INSTRUCTION && instructionOf(scope, ownerId)) return null; // only one allowed
  const note = { id: uid(s.idPrefix), [s.ownerKey]: ownerId, kind: vals.kind, date: nowIso() };
  assignNoteFields(note, vals);
  db[s.list].push(note);
  return note;
}

/* Applies an edit. The date is refreshed only when something really
 * changed; returns whether it did. */
function updateNote(note, vals){
  const keys = note.kind === NOTE_KIND_CREATION
    ? ['description', 'diameter', 'client', 'za']
    : note.kind === NOTE_KIND_INSTRUCTION
      ? ['description']
      : ['description', 'name'];
  const linksChanged = JSON.stringify(validLinks(note.links)) !== JSON.stringify(validLinks(vals.links));
  const changed = linksChanged || keys.some(k => (note[k] ?? '') !== (vals[k] ?? ''));
  if(!changed) return false;
  assignNoteFields(note, vals);
  note.date = nowIso();
  return true;
}


/* ---------------- Lazy photo preload for grids ---------------- */
let photoPreloadInFlight = false;
async function ensureElementPhotosLoaded(departmentId){
  const els = elementsOf(departmentId).filter(e => !photoCache[e.id]);
  if(els.length===0 || photoPreloadInFlight) return;
  photoPreloadInFlight = true;
  for(const e of els){
    photoCache[e.id] = await loadPhotos(e.id);
  }
  photoPreloadInFlight = false;
  // only re-render if still on the same elements view
  const view = currentView();
  if(view.view==='elements' && view.departmentId===departmentId) render();
}

let instancePhotoPreloadInFlight = false;
async function ensureInstancePhotosLoaded(instanceId){
  if(instancePhotoCache[instanceId] || instancePhotoPreloadInFlight) return;
  instancePhotoPreloadInFlight = true;
  instancePhotoCache[instanceId] = await loadInstancePhotos(instanceId);
  instancePhotoPreloadInFlight = false;
  const view = currentView();
  if(view.view==='information' && view.instanceId===instanceId) render();
}

let instanceFilesPreloadInFlight = false;
async function ensureInstanceFilesLoaded(instanceId){
  if(instanceFilesCache[instanceId] || instanceFilesPreloadInFlight) return;
  instanceFilesPreloadInFlight = true;
  instanceFilesCache[instanceId] = await loadInstanceFiles(instanceId);
  instanceFilesPreloadInFlight = false;
  const view = currentView();
  if(view.view==='information' && view.instanceId===instanceId) render();
}
