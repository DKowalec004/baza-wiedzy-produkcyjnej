/* ===== js/storage.js ===== */
/*
 * storage.js — Warstwa dostępu do API serwera.
 * Wczytuje i zapisuje stan aplikacji w MSSQL (przez /api),
 * a pliki binarne odkłada w folderach Zdjęcia / Załączniki / tabele.
 */

const API_BASE = '/api';

async function apiRequest(path, options = {}) {
  const opts = { ...options };
  const headers = { ...(options.headers || {}) };
  if (opts.body && !(opts.body instanceof FormData) && typeof opts.body !== 'string') {
    headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(opts.body);
  }
  opts.headers = headers;
  let res;
  try {
    res = await fetch(API_BASE + path, opts);
  } catch (err) {
    console.error('API network error', path, err);
    showToast('Brak połączenia z serwerem.');
    throw err;
  }
  if (!res.ok) {
    let message = 'Błąd serwera (' + res.status + ').';
    try {
      const payload = await res.json();
      if (payload && payload.message) message = payload.message;
    } catch (e) { /* ignore parse errors */ }
    console.error('API error', path, res.status, message);
    showToast(message);
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  if (res.status === 204) return null;
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

function emptyDb() {
  return {
    departments: [], elements: [], instances: [], informations: [],
    elementInformations: [], elementNotes: [], instanceNotes: [],
    techGroups: [], techInfos: [], techTables: []
  };
}

function applyStatePayload(payload) {
  db = payload.db || emptyDb();
  db.departments = db.departments || [];
  db.elements = db.elements || [];
  db.instances = db.instances || [];
  db.informations = db.informations || [];
  db.elementInformations = db.elementInformations || [];
  db.elementNotes = db.elementNotes || [];
  db.instanceNotes = db.instanceNotes || [];
  db.techGroups = db.techGroups || [];
  db.techInfos = db.techInfos || [];
  db.techTables = db.techTables || [];
  photoCache = payload.photos || {};
  instancePhotoCache = payload.instancePhotos || {};
  elementFilesCache = payload.elementFiles || {};
  instanceFilesCache = payload.instanceFiles || {};
}

async function loadData() {
  try {
    const payload = await apiRequest('/state');
    applyStatePayload(payload);
    storageAvailable = true;
  } catch (e) {
    storageAvailable = false;
    db = emptyDb();
  }
  dataLoaded = true;
}

async function saveData() {
  try {
    const payload = await apiRequest('/state', { method: 'PUT', body: { db } });
    if (payload && payload.db) applyStatePayload(payload);
    storageAvailable = true;
  } catch (e) {
    storageAvailable = false;
    throw e;
  }
}

async function uploadDataUrl(url, extra) {
  const form = extra || new FormData();
  form.append('dataUrl', url);
  return form;
}

async function persistMediaList(kind, ownerId, items, endpoint) {
  const normalized = [];
  for (const item of items) {
    if (typeof item === 'string' && item.startsWith('data:')) {
      const created = await apiRequest(endpoint, {
        method: 'POST',
        body: { ownerType: kind, ownerId, dataUrl: item }
      });
      normalized.push(created.url);
    } else if (item && typeof item === 'object' && item.dataUrl && String(item.dataUrl).startsWith('data:')) {
      const created = await apiRequest(endpoint, {
        method: 'POST',
        body: {
          ownerType: kind,
          ownerId,
          dataUrl: item.dataUrl,
          name: item.name,
          type: item.type,
          size: item.size,
          id: item.id
        }
      });
      normalized.push({
        id: created.id || item.id,
        name: created.name || item.name,
        type: created.type || item.type || '',
        size: created.size || item.size || 0,
        url: created.url,
        dataUrl: created.url
      });
    } else if (item && typeof item === 'object') {
      normalized.push({
        id: item.id,
        name: item.name,
        type: item.type || '',
        size: item.size || 0,
        url: item.url || item.dataUrl,
        dataUrl: item.url || item.dataUrl
      });
    } else {
      normalized.push(item);
    }
  }
  await apiRequest(endpoint + '/' + encodeURIComponent(kind) + '/' + encodeURIComponent(ownerId), {
    method: 'PUT',
    body: { items: normalized }
  });
  return normalized;
}

async function loadPhotos(elementId) {
  try {
    const payload = await apiRequest('/photos/element/' + encodeURIComponent(elementId));
    return payload.items || [];
  } catch (e) {
    return photoCache[elementId] || [];
  }
}

async function savePhotos(elementId, photos) {
  try {
    photoCache[elementId] = await persistMediaList('element', elementId, photos, '/photos');
  } catch (e) {
    showToast('Nie udało się zapisać zdjęcia.');
  }
}

async function loadInstancePhotos(instanceId) {
  try {
    const payload = await apiRequest('/photos/instance/' + encodeURIComponent(instanceId));
    return payload.items || [];
  } catch (e) {
    return instancePhotoCache[instanceId] || [];
  }
}

async function saveInstancePhotos(instanceId, photos) {
  try {
    instancePhotoCache[instanceId] = await persistMediaList('instance', instanceId, photos, '/photos');
  } catch (e) {
    showToast('Nie udało się zapisać zdjęcia.');
  }
}

async function loadElementFiles(elementId) {
  try {
    const payload = await apiRequest('/attachments/element/' + encodeURIComponent(elementId));
    return payload.items || [];
  } catch (e) {
    return elementFilesCache[elementId] || [];
  }
}

async function saveElementFiles(elementId, files) {
  try {
    elementFilesCache[elementId] = await persistMediaList('element', elementId, files, '/attachments');
  } catch (e) {
    showToast('Nie udało się zapisać załącznika.');
  }
}

async function loadInstanceFiles(instanceId) {
  try {
    const payload = await apiRequest('/attachments/instance/' + encodeURIComponent(instanceId));
    return payload.items || [];
  } catch (e) {
    return instanceFilesCache[instanceId] || [];
  }
}

async function saveInstanceFiles(instanceId, files) {
  try {
    instanceFilesCache[instanceId] = await persistMediaList('instance', instanceId, files, '/attachments');
  } catch (e) {
    showToast('Nie udało się zapisać załącznika.');
  }
}

async function deleteOwnedMedia(kind, ownerIds) {
  for (const ownerId of ownerIds) {
    try { await apiRequest('/photos/' + kind + '/' + encodeURIComponent(ownerId), { method: 'DELETE' }); } catch (e) {}
    try { await apiRequest('/attachments/' + kind + '/' + encodeURIComponent(ownerId), { method: 'DELETE' }); } catch (e) {}
  }
}

async function saveTechTable({ id, groupId, name, table, date, file }) {
  const form = new FormData();
  form.append('id', id);
  form.append('groupId', groupId);
  form.append('name', name);
  form.append('date', date || '');
  form.append('table', JSON.stringify(table));
  if (file) form.append('file', file, file.name);
  return apiRequest('/tables', { method: 'POST', body: form });
}

async function updateTechTable(id, { name, table, date }) {
  return apiRequest('/tables/' + encodeURIComponent(id), {
    method: 'PUT',
    body: { name, table, date }
  });
}

async function deleteTechTable(id) {
  return apiRequest('/tables/' + encodeURIComponent(id), { method: 'DELETE' });
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function fileHref(file) {
  return file.url || file.dataUrl || '';
}
