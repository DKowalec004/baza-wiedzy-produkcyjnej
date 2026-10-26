/* ===== js/ui.js ===== */
/*
 * ui.js — Generic, domain-agnostic UI building blocks: toasts, the modal
 * dialog engine (incl. the multi-row "add processes" dialog), the image
 * lightbox, HTML-escaping, and image/file helpers. Anything in here could
 * be reused by a completely different app; it has no knowledge of
 * departments, elements, instances, etc.
 */

/* ---------------- Escaping ---------------- */
/* Escapes &, <, > and both kinds of quotes, so the result is safe both in
 * element text and inside value="..." / title="..." attributes. */
function esc(str){
  const d = document.createElement('div');
  d.textContent = str==null?'':str;
  return d.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}


/* ---------------- Toast ---------------- */
let toastTimer = null;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), 2400);
}

/* ---------------- Image resize ---------------- */
function resizeImageFile(file, maxW=900){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onload = (e)=>{
      const img = new Image();
      img.onload = ()=>{
        const scale = Math.min(1, maxW/img.width);
        const w = Math.round(img.width*scale);
        const h = Math.round(img.height*scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img,0,0,w,h);
        resolve(canvas.toDataURL('image/jpeg', 0.72));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


/* ---------------- Modal ---------------- */
function openModal({title, fields, initial={}, onSave, saveLabel='Zapisz'}){
  const root = document.getElementById('modal-root');
  const imageValues = {};
  const fieldsHtml = fields.map(f=>{
    const val = initial[f.key] !== undefined ? initial[f.key] : '';
    if(f.type==='textarea'){
      return `<div class="field"><label>${esc(f.label)}</label><textarea id="mf-${f.key}">${esc(val)}</textarea></div>`;
    } else if(f.type==='checkbox'){
      return `<div class="field checkbox-field"><input type="checkbox" id="mf-${f.key}" ${val?'checked':''}><label for="mf-${f.key}">${esc(f.label)}</label></div>`;
    } else if(f.type==='image'){
      imageValues[f.key] = val || null;
      return `
        <div class="field">
          <label>${esc(f.label)}</label>
          <div style="display:flex;align-items:center;gap:12px;">
            <div class="info-photo-box">
              <label class="info-photo-label" style="cursor:pointer;">
                <img id="mf-${f.key}-preview" class="info-photo-img" src="${val || ''}" style="${val ? '' : 'display:none;'}">
                <span id="mf-${f.key}-plus" class="info-photo-plus" style="${val ? 'display:none;' : ''}">+</span>
                <input type="file" accept="image/*" id="mf-${f.key}-file" style="display:none;">
              </label>
            </div>
            <button type="button" class="btn btn-ghost" id="mf-${f.key}-remove" style="${val ? '' : 'display:none;'}">Usuń zdjęcie</button>
          </div>
        </div>`;
    } else {
      return `<div class="field"><label>${esc(f.label)}</label><input type="text" id="mf-${f.key}" value="${esc(val)}"></div>`;
    }
  }).join('');

  root.innerHTML = `
    <div class="overlay" id="modal-overlay">
      <div class="modal">
        <h3>${esc(title)}</h3>
        <form id="modal-form">
          ${fieldsHtml}
          <div id="modal-error" class="field-error" style="display:none;"></div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" id="modal-cancel">Anuluj</button>
            <button type="submit" class="btn btn-primary">${esc(saveLabel)}</button>
          </div>
        </form>
      </div>
    </div>`;

  const overlay = document.getElementById('modal-overlay');
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closeModal(); });
  document.getElementById('modal-cancel').addEventListener('click', closeModal);

  for(const f of fields){
    if(f.type!=='image') continue;
    const fileInput = document.getElementById(`mf-${f.key}-file`);
    const preview = document.getElementById(`mf-${f.key}-preview`);
    const plus = document.getElementById(`mf-${f.key}-plus`);
    const removeBtn = document.getElementById(`mf-${f.key}-remove`);
    fileInput.addEventListener('change', async (e)=>{
      const file = e.target.files[0];
      if(!file) return;
      try{
        const dataUrl = await resizeImageFile(file, 400);
        imageValues[f.key] = dataUrl;
        preview.src = dataUrl;
        preview.style.display = '';
        plus.style.display = 'none';
        removeBtn.style.display = '';
      }catch(err){
        showToast('Nie udało się przetworzyć zdjęcia.');
      }
    });
    removeBtn.addEventListener('click', ()=>{
      imageValues[f.key] = null;
      preview.src = '';
      preview.style.display = 'none';
      plus.style.display = '';
      removeBtn.style.display = 'none';
    });
  }

  document.getElementById('modal-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const values = {};
    for(const f of fields){
      if(f.type==='image'){
        values[f.key] = imageValues[f.key];
        continue;
      }
      const el = document.getElementById('mf-'+f.key);
      values[f.key] = f.type==='checkbox' ? el.checked : el.value.trim();
    }
    const nameField = fields.find(f=>f.key==='name');
    if(nameField && !values.name){
      const err = document.getElementById('modal-error');
      err.textContent = 'Nazwa jest wymagana.';
      err.style.display='block';
      return;
    }
    closeModal();
    onSave(values);
  });
  setTimeout(()=>{ const first = document.getElementById('mf-'+fields[0].key); if(first) first.focus(); }, 30);
}
function closeModal(){
  document.getElementById('modal-root').innerHTML='';
  if(typeof pollStateVersion === 'function') pollStateVersion();
}

/* Existing process descriptions, scoped to a single department, used as
   combobox suggestions when adding new processes there. */
function processDescriptionsForDepartment(departmentId){
  const seen = new Set();
  const list = [];
  for(const info of db.informations){
    if(info.type!=='process' || !info.description) continue;
    const inst = getInstance(info.instanceId);
    if(!inst) continue;
    const el = getElement(inst.elementId);
    if(!el || el.departmentId!==departmentId) continue;
    if(!seen.has(info.description)){ seen.add(info.description); list.push(info.description); }
  }
  return list;
}

let processRowCounter = 0;
function openProcessModal(view, inst, el, dept){
  const root = document.getElementById('modal-root');
  const suggestions = processDescriptionsForDepartment(dept.id);
  const datalistId = 'process-suggestions-list';
  processRowCounter = 0;

  function rowHtml(){
    processRowCounter++;
    return `
      <div class="process-row" data-row-id="${processRowCounter}">
        <input type="text" list="${datalistId}" placeholder="Opis procesu…" autocomplete="off">
        <button type="button" class="process-row-remove" data-remove-row title="Usuń wiersz">×</button>
      </div>`;
  }

  root.innerHTML = `
    <div class="overlay" id="modal-overlay">
      <div class="modal" style="max-width:520px;">
        <h3>Dodaj procesy</h3>
        <div class="section-sub" style="margin:-10px 0 14px;">Podpowiedzi pochodzą z opisów procesów już istniejących w dziale „${esc(dept.name)}”. Możesz też wpisać własny tekst.</div>
        <datalist id="${datalistId}">
          ${suggestions.map(s=>`<option value="${esc(s)}"></option>`).join('')}
        </datalist>
        <div class="process-rows" id="process-rows">${rowHtml()}</div>
        <button type="button" class="add-row-btn" id="add-process-row">+ Dodaj kolejny wiersz</button>
        <div id="process-modal-error" class="field-error" style="display:none;"></div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" id="process-modal-cancel">Anuluj</button>
          <button type="button" class="btn btn-primary" id="process-modal-save">Dodaj wszystkie</button>
        </div>
      </div>
    </div>`;

  const overlay = document.getElementById('modal-overlay');
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closeModal(); });
  document.getElementById('process-modal-cancel').addEventListener('click', closeModal);

  function updateRemoveButtonsState(){
    const rows = document.querySelectorAll('#process-rows .process-row');
    rows.forEach(r=>{
      const btn = r.querySelector('[data-remove-row]');
      btn.disabled = rows.length<=1;
    });
  }

  document.getElementById('add-process-row').addEventListener('click', ()=>{
    document.getElementById('process-rows').insertAdjacentHTML('beforeend', rowHtml());
    updateRemoveButtonsState();
    const inputs = document.querySelectorAll('#process-rows input');
    inputs[inputs.length-1].focus();
  });

  document.getElementById('process-rows').addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-remove-row]');
    if(!btn || btn.disabled) return;
    btn.closest('.process-row').remove();
    updateRemoveButtonsState();
  });

  document.getElementById('process-modal-save').addEventListener('click', async ()=>{
    const inputs = Array.from(document.querySelectorAll('#process-rows input'));
    const descriptions = inputs.map(i=>i.value.trim()).filter(v=>v.length>0);
    if(descriptions.length===0){
      const err = document.getElementById('process-modal-error');
      err.textContent = 'Wprowadź co najmniej jeden opis procesu.';
      err.style.display='block';
      return;
    }
    let counter = processCountForInstance(view.instanceId);
    for(const desc of descriptions){
      counter++;
      db.informations.push({
        id: uid('info'),
        instanceId: view.instanceId,
        name: `Proces ${counter}`,
        description: desc,
        optional: false,
        type: 'process'
      });
    }
    await saveData();
    closeModal();
    render();
  });

  setTimeout(()=>{ const first = document.querySelector('#process-rows input'); if(first) first.focus(); }, 30);
  updateRemoveButtonsState();
}

/* Add / edit dialog for technological notes (element and instance level).
 * Adding: the user first picks the kind of note. Editing: the kind is fixed.
 *   Uwagi do tworzenia elementu : diameter (required), content (required),
 *                                  client and ZA (optional)
 *   Uwagi ogólne                : title (required), content
 * onSave receives { kind, name, description, diameter, client, za }. */
function openNoteModal({title, note=null, onSave, instructionExists=false}){
  const root = document.getElementById('modal-root');
  const isEdit = !!note;
  const startKind = isEdit ? (note.kind || NOTE_KIND_GENERAL) : NOTE_KIND_CREATION;
  const kindLabel = k => k === NOTE_KIND_CREATION ? 'Uwagi do tworzenia elementu'
    : k === NOTE_KIND_INSTRUCTION ? 'Instrukcja ogólna' : 'Uwagi ogólne';

  const kindBlock = isEdit
    ? `<div class="field"><label>Rodzaj uwagi</label><div class="note-kind-fixed">${esc(kindLabel(startKind))}</div></div>`
    : `<div class="field">
         <label>Rodzaj uwagi</label>
         <div class="radio-group">
           <label class="radio-option"><input type="radio" name="note-kind" value="${NOTE_KIND_CREATION}" checked> 1. ${esc(kindLabel(NOTE_KIND_CREATION))}</label>
           <label class="radio-option"><input type="radio" name="note-kind" value="${NOTE_KIND_GENERAL}"> 2. ${esc(kindLabel(NOTE_KIND_GENERAL))}</label>
           <label class="radio-option"><input type="radio" name="note-kind" value="${NOTE_KIND_INSTRUCTION}" ${instructionExists ? 'disabled' : ''}> 3. ${esc(kindLabel(NOTE_KIND_INSTRUCTION))}${instructionExists ? ' (już istnieje)' : ''}</label>
         </div>
       </div>`;

  root.innerHTML = `
    <div class="overlay" id="modal-overlay">
      <div class="modal">
        <h3>${esc(title)}</h3>
        <form id="modal-form">
          ${kindBlock}
          <div class="field" data-note-kind="${NOTE_KIND_GENERAL}"><label>Tytuł</label><input type="text" id="nf-name"></div>
          <div class="field" data-note-kind="${NOTE_KIND_CREATION}"><label>Średnica</label><input type="text" id="nf-diameter" inputmode="decimal" placeholder="np. 12 lub 12,5"></div>
          <div class="field"><label>Treść</label><textarea id="nf-description"></textarea></div>
          <div class="field" data-note-kind="${NOTE_KIND_CREATION}"><label>Klient (opcjonalnie)</label><input type="text" id="nf-client"></div>
          <div class="field" data-note-kind="${NOTE_KIND_CREATION}"><label>ZA (opcjonalnie)</label><input type="text" id="nf-za"></div>
          <div class="field" data-note-kind="${NOTE_KIND_CREATION} ${NOTE_KIND_GENERAL} ${NOTE_KIND_INSTRUCTION}">
            <label>Odnośniki (opcjonalnie)</label>
            <div class="link-picker">
              <div class="link-chips" id="nf-link-chips"></div>
              <input type="text" id="nf-link-filter" placeholder="Szukaj miejsca w aplikacji…" autocomplete="off">
              <select id="nf-link-select" size="5"></select>
              <div class="link-add-row">
                <button type="button" class="btn btn-ghost" id="nf-link-add">+ Dodaj odnośnik</button>
              </div>
            </div>
          </div>
          <div id="modal-error" class="field-error" style="display:none;"></div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" id="modal-cancel">Anuluj</button>
            <button type="submit" class="btn btn-primary">Zapisz</button>
          </div>
        </form>
      </div>
    </div>`;

  // Values are set as properties (not interpolated into the markup), so
  // quotes such as 1/2" in a title or client name can never break the form.
  const $ = id => document.getElementById(id);
  if(isEdit){
    $('nf-name').value = note.name || '';
    $('nf-diameter').value = note.diameter != null ? formatDiameter(note.diameter) : '';
    $('nf-description').value = note.description || '';
    $('nf-client').value = note.client || '';
    $('nf-za').value = note.za || '';
  }

  const currentKind = () => {
    const checked = document.querySelector('input[name="note-kind"]:checked');
    return checked ? checked.value : startKind;
  };
  const applyKind = () => {
    const kind = currentKind();
    document.querySelectorAll('#modal-form [data-note-kind]').forEach(el => {
      el.style.display = el.getAttribute('data-note-kind').split(' ').includes(kind) ? '' : 'none';
    });
  };
  document.querySelectorAll('input[name="note-kind"]').forEach(r => r.addEventListener('change', () => {
    applyKind();
    $('modal-error').style.display = 'none';
  }));
  applyKind();

  // ---- links picker: chips for the chosen places + a filterable list of all places ----
  const targets = allLinkTargets();
  let links = isEdit ? validLinks(note.links) : [];
  const chosen = t => links.some(l => l.type === t.type && l.id === t.id);
  const renderChips = () => {
    $('nf-link-chips').innerHTML = links.map((l, i) => {
      const r = resolveLink(l);
      return `<span class="link-chip" title="${esc(linkTitle(r))}">${esc(r.name)}<button type="button" data-remove-link="${i}" title="Usuń odnośnik">×</button></span>`;
    }).join('');
    $('nf-link-chips').style.display = links.length ? '' : 'none';
    $('nf-link-chips').querySelectorAll('[data-remove-link]').forEach(b => b.addEventListener('click', () => {
      links.splice(+b.getAttribute('data-remove-link'), 1);
      renderChips(); renderOptions();
    }));
  };
  const renderOptions = () => {
    const q = $('nf-link-filter').value.trim().toLowerCase();
    $('nf-link-select').innerHTML = targets
      .map((t, i) => ({ t, i }))
      .filter(({ t }) => !chosen(t) && t.text.toLowerCase().includes(q))
      .map(({ t, i }) => `<option value="${i}">${esc(t.text)}</option>`).join('');
  };
  const addSelectedLink = () => {
    const sel = $('nf-link-select');
    if(sel.value === '') return;
    const t = targets[+sel.value];
    links.push({ type: t.type, id: t.id });
    renderChips(); renderOptions();
  };
  $('nf-link-filter').addEventListener('input', renderOptions);
  $('nf-link-filter').addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); if(!$('nf-link-select').value && $('nf-link-select').options.length) $('nf-link-select').selectedIndex = 0; addSelectedLink(); } });
  $('nf-link-select').addEventListener('dblclick', addSelectedLink);
  $('nf-link-add').addEventListener('click', () => { if(!$('nf-link-select').value && $('nf-link-select').options.length === 1) $('nf-link-select').selectedIndex = 0; addSelectedLink(); });
  renderChips(); renderOptions();

  const overlay = $('modal-overlay');
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closeModal(); });
  $('modal-cancel').addEventListener('click', closeModal);

  $('modal-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const kind = currentKind();
    const vals = {
      kind,
      links,
      name: $('nf-name').value.trim(),
      description: $('nf-description').value.trim(),
      diameter: null,
      client: '',
      za: ''
    };
    let error = '';
    if(kind === NOTE_KIND_INSTRUCTION){
      if(!vals.description) error = 'Treść instrukcji jest wymagana.';
    } else if(kind === NOTE_KIND_CREATION){
      vals.diameter = parseDiameter($('nf-diameter').value);
      vals.client = $('nf-client').value.trim();
      vals.za = $('nf-za').value.trim();
      if(isNaN(vals.diameter)) error = 'Podaj średnicę jako liczbę większą od zera (np. 12 lub 12,5).';
      else if(!vals.description) error = 'Treść uwagi jest wymagana.';
    } else if(!vals.name){
      error = 'Tytuł jest wymagany.';
    }
    if(error){
      const err = $('modal-error');
      err.textContent = error;
      err.style.display = 'block';
      return;
    }
    closeModal();
    onSave(vals);
  });

  setTimeout(()=>{
    const k = currentKind();
    const first = k === NOTE_KIND_CREATION ? $('nf-diameter') : k === NOTE_KIND_INSTRUCTION ? $('nf-description') : $('nf-name');
    if(first) first.focus();
  }, 30);
}

/* Adding a table: title + an Excel file; the sheet is read into plain cells
 * and the file itself is dropped. onSave({ name, table }). */
function openTableAddModal({onSave}){
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="overlay" id="modal-overlay">
      <div class="modal modal-wide">
        <h3>Nowa tabela</h3>
        <form id="modal-form">
          <div class="field"><label>Tytuł</label><input type="text" id="nf-name"></div>
          <div class="field">
            <label>Plik Excel (.xlsx, .xls)</label>
            <input type="file" id="nf-table-file" accept=".xlsx,.xlsm,.xls">
            <select id="nf-table-sheet" style="display:none;margin-top:8px;"></select>
            <div class="table-msg" id="nf-table-hint" style="display:none;">Zaznacz wiersze, które mają być nagłówkiem tabeli (zostają widoczne przy przewijaniu). Zaznaczenie wiersza obejmuje też wszystkie wiersze nad nim.</div>
            <div class="table-msg" id="nf-table-msg">Wczytana zostanie tabela z wybranego arkusza. Plik Excel zostanie zapisany w folderze tabele na serwerze.</div>
            <div id="nf-table-preview"></div>
          </div>
          <div id="modal-error" class="field-error" style="display:none;"></div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" id="modal-cancel">Anuluj</button>
            <button type="submit" class="btn btn-primary">Zapisz</button>
          </div>
        </form>
      </div>
    </div>`;
  const $ = id => document.getElementById(id);
  let workbook = null, pendingTable = null, pendingFile = null;
  const drawPreview = () => {
    const t = pendingTable;
    $('nf-table-hint').style.display = t ? '' : 'none';
    $('nf-table-preview').innerHTML = t ? tableMarkup(t, (r, c, v) => esc(v), {
      leading: r => `<input type="checkbox" data-header-row="${r}" title="Wiersz nagłówka" ${r < headerRowCount(t) ? 'checked' : ''}>`
    }) : '';
    $('nf-table-preview').querySelectorAll('[data-header-row]').forEach(cb => cb.addEventListener('change', () => {
      const r = +cb.getAttribute('data-header-row');
      // header rows are always a block from the top: checking row r includes the rows above, unchecking it releases the rows below
      t.headerRows = cb.checked ? r + 1 : r;
      drawPreview();
    }));
  };
  const showTable = (table, message) => {
    pendingTable = table;
    drawPreview();
    if(message !== undefined) $('nf-table-msg').textContent = message;
  };
  const loadSheet = name => {
    const table = sheetToTable(workbook.Sheets[name]);
    if(table.rows.length === 0) return showTable(null, 'Ten arkusz jest pusty.');
    if(table.rows.length > TABLE_MAX_ROWS || table.rows[0].length > TABLE_MAX_COLS){
      return showTable(null, `Tabela jest zbyt duża (maks. ${TABLE_MAX_ROWS} wierszy i ${TABLE_MAX_COLS} kolumn).`);
    }
    showTable(table, `${table.rows.length - 1} ${table.rows.length - 1 === 1 ? 'wiersz' : 'wierszy'} danych · ${table.rows[0].length} kolumn.`);
  };
  $('nf-table-file').addEventListener('change', async (e)=>{
    const file = e.target.files[0];
    workbook = null; pendingFile = file || null; showTable(null, '');
    $('nf-table-sheet').style.display = 'none';
    if(!file) return;
    if(typeof XLSX === 'undefined'){ $('nf-table-msg').textContent = 'Nie udało się załadować modułu odczytu Excela.'; return; }
    try{
      const buf = await file.arrayBuffer();
      if(!isExcelBuffer(buf)) throw new Error('not-excel');
      workbook = XLSX.read(buf, { type: 'array', cellStyles: true }); // cellStyles: needed for column widths
    }catch(err){
      $('nf-table-msg').textContent = 'Nie udało się odczytać tego pliku. Wybierz plik Excel (.xlsx lub .xls).';
      return;
    }
    const sel = $('nf-table-sheet');
    sel.innerHTML = workbook.SheetNames.map((n, i) => `<option value="${i}">${esc(n)}</option>`).join('');
    sel.style.display = workbook.SheetNames.length > 1 ? '' : 'none';
    loadSheet(workbook.SheetNames[0]);
  });
  $('nf-table-sheet').addEventListener('change', e => loadSheet(workbook.SheetNames[+e.target.value]));

  const overlay = $('modal-overlay');
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closeModal(); });
  $('modal-cancel').addEventListener('click', closeModal);
  $('modal-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = $('nf-name').value.trim();
    const error = !name ? 'Tytuł jest wymagany.' : !pendingTable ? 'Wybierz plik Excel z tabelą do wczytania.' : '';
    if(error){
      const err = $('modal-error');
      err.textContent = error;
      err.style.display = 'block';
      return;
    }
    closeModal();
    onSave({ name, table: pendingTable, file: pendingFile });
  });
  setTimeout(()=>{ $('nf-name').focus(); }, 30);
}

/* Editing a table: title and cell values only. The structure (rows, columns,
 * merges) is fixed, so there is nothing to add or remove. onSave({ name, table }). */
function openTableEditModal({item, onSave}){
  const root = document.getElementById('modal-root');
  const table = item.table;
  root.innerHTML = `
    <div class="overlay" id="modal-overlay">
      <div class="modal modal-wide">
        <h3>Edytuj tabelę</h3>
        <form id="modal-form">
          <div class="field"><label>Tytuł</label><input type="text" id="nf-name"></div>
          <div class="field"><label>Wartości komórek</label>
            ${tableMarkup(table, (r, c, v) => `<textarea rows="1" class="table-edit-input" data-r="${r}" data-c="${c}"></textarea>`)}
          </div>
          <div id="modal-error" class="field-error" style="display:none;"></div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" id="modal-cancel">Anuluj</button>
            <button type="submit" class="btn btn-primary">Zapisz</button>
          </div>
        </form>
      </div>
    </div>`;
  const $ = id => document.getElementById(id);
  $('nf-name').value = item.name || '';
  document.querySelectorAll('.table-edit-input').forEach(inp => {
    inp.value = table.rows[+inp.dataset.r][+inp.dataset.c];
    inp.rows = inp.value.split('\n').length; // keep multi-line cells readable
  });
  const overlay = $('modal-overlay');
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closeModal(); });
  $('modal-cancel').addEventListener('click', closeModal);
  $('modal-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = $('nf-name').value.trim();
    if(!name){
      const err = $('modal-error');
      err.textContent = 'Tytuł jest wymagany.';
      err.style.display = 'block';
      return;
    }
    const rows = table.rows.map(r => r.slice());
    document.querySelectorAll('.table-edit-input').forEach(inp => { rows[+inp.dataset.r][+inp.dataset.c] = inp.value; });
    closeModal();
    onSave({ name, table: { ...table, rows } });
  });
  setTimeout(()=>{ $('nf-name').focus(); }, 30);
}

function confirmDelete(msg, onYes){
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="overlay" id="confirm-overlay">
      <div class="modal" style="max-width:380px;">
        <h3>Usunąć?</h3>
        <p style="font-size:14px;color:var(--ink-soft);">${esc(msg)}</p>
        <div class="modal-actions">
          <button class="btn btn-ghost" id="confirm-no">Anuluj</button>
          <button class="btn btn-primary" style="background:var(--danger);" id="confirm-yes">Usuń</button>
        </div>
      </div>
    </div>`;
  document.getElementById('confirm-overlay').addEventListener('click',(e)=>{ if(e.target.id==='confirm-overlay') closeModal(); });
  document.getElementById('confirm-no').addEventListener('click', closeModal);
  document.getElementById('confirm-yes').addEventListener('click', ()=>{ closeModal(); onYes(); });
}

function openLightbox(src){
  const root = document.getElementById('lightbox-root');
  root.innerHTML = `<div class="lightbox" id="lb"><img src="${src}"></div>`;
  document.getElementById('lb').addEventListener('click', ()=>{
    root.innerHTML='';
    if(typeof pollStateVersion === 'function') pollStateVersion();
  });
}
