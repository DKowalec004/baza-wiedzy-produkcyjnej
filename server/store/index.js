'use strict';

const config = require('../config');
const logger = require('../logger');
const files = require('../files');
const jsonStore = require('./json-store');
const mssqlStore = require('./mssql-store');
const { normalizeDb, emptyState, uid, versionConflict } = require('./helpers');

let backend = jsonStore;
let backendName = 'json';
let currentVersion = 0;
let writeTail = Promise.resolve();

function enqueueWrite(fn) {
  const run = writeTail.then(() => fn(), () => fn());
  writeTail = run.then(() => undefined, () => undefined);
  return run;
}

function rememberVersion(state) {
  if (state && state.version != null) currentVersion = Number(state.version) || 0;
  return state;
}

async function rememberVersionAfterMutation(state) {
  if (state && state.version != null) {
    currentVersion = Number(state.version) || 0;
    return currentVersion;
  }
  if (typeof backend.getVersion === 'function') {
    currentVersion = Number(await backend.getVersion()) || currentVersion;
  } else {
    currentVersion += 1;
  }
  return currentVersion;
}

async function initStore() {
  files.ensureStorageDirs();
  if (!config.mssqlEnabled) {
    backend = jsonStore;
    backendName = 'json';
    logger.warn('MSSQL wyłączone — używany jest lokalny plik data/state.json');
  } else {
    try {
      await mssqlStore.connect();
      backend = mssqlStore;
      backendName = 'mssql';
    } catch (err) {
      backend = jsonStore;
      backendName = 'json';
      logger.error('Nie udało się połączyć z MSSQL — przełączenie na plik JSON', {
        error: err.message,
        stack: err.stack
      });
    }
  }
  try {
    rememberVersion(await backend.loadState());
  } catch (err) {
    currentVersion = 0;
    logger.warn('Nie udało się odczytać wersji stanu — ustawiono 0', { error: err.message });
  }
  return backendName;
}

function attachTables(state) {
  for (const table of state.db.techTables) {
    const fileName = table.dataFileName || `${table.id}.json`;
    const fromDisk = files.readJsonTable(fileName);
    if (fromDisk) table.table = fromDisk;
    else if (!table.table) table.table = { rows: [], merges: [], widths: [], headerRows: 1 };
    table.dataFileName = fileName;
  }
  return state;
}

function persistDbFiles(db) {
  const next = normalizeDb(db);
  for (const dept of next.departments) {
    dept.photo = files.persistImageField('deptphoto_' + dept.id, dept.photo) || undefined;
  }
  for (const info of next.informations) {
    info.photo = files.persistImageField('infophoto_' + info.id, info.photo) || undefined;
  }
  for (const table of next.techTables) {
    if (table.table) {
      const written = files.writeJsonTable(table.id, table.table);
      table.dataFileName = written.fileName;
    }
    if (!table.sourceFileName) table.sourceFileName = files.findTableSource(table.id);
  }
  return next;
}

function persistPhotoItems(kind, ownerId, items) {
  const urls = [];
  for (const item of items || []) {
    if (files.isDataUrl(item)) {
      urls.push(files.saveDataUrl('photos', uid('img'), item).url);
    } else if (item && typeof item === 'object' && files.isDataUrl(item.dataUrl || item.url)) {
      urls.push(files.saveDataUrl('photos', item.id || uid('img'), item.dataUrl || item.url).url);
    } else if (item && typeof item === 'object') {
      urls.push(item.url || item.dataUrl);
    } else {
      urls.push(item);
    }
  }
  return urls.filter(Boolean);
}

function persistAttachmentItems(kind, ownerId, items) {
  const out = [];
  for (const item of items || []) {
    if (item && files.isDataUrl(item.dataUrl || item.url)) {
      const saved = files.saveDataUrl('attachments', item.id || uid('file'), item.dataUrl || item.url, item.name);
      out.push({
        id: item.id || uid('file'),
        name: item.name || saved.originalName || saved.fileName,
        type: item.type || saved.mime || '',
        size: item.size || saved.size || 0,
        fileName: saved.fileName,
        url: saved.url,
        dataUrl: saved.url
      });
    } else if (item && typeof item === 'object') {
      out.push({
        id: item.id,
        name: item.name,
        type: item.type || '',
        size: item.size || 0,
        fileName: item.fileName || files.fileNameFromUrl(item.url || item.dataUrl),
        url: item.url || item.dataUrl,
        dataUrl: item.url || item.dataUrl
      });
    }
  }
  return out;
}

function removeUrls(kind, urls) {
  for (const url of urls || []) files.removeFile(kind, files.fileNameFromUrl(url));
}

const store = {
  name: () => backendName,
  getVersion: () => currentVersion,

  async loadState() {
    const state = rememberVersion(await backend.loadState());
    return attachTables(state || emptyState());
  },

  async saveState(db, options = {}) {
    return enqueueWrite(async () => {
      const expected = options.expectedVersion;
      if (expected != null && Number(expected) !== Number(currentVersion)) {
        throw versionConflict(attachTables(rememberVersion(await backend.loadState()) || emptyState()));
      }
      const persisted = persistDbFiles(db);
      const state = rememberVersion(await backend.saveDb(persisted));
      return attachTables(state);
    });
  },

  async importAll(payload) {
    return enqueueWrite(async () => {
      const db = persistDbFiles(payload.db);
      const photos = {};
      const instancePhotos = {};
      const elementFiles = {};
      const instanceFiles = {};
      for (const [id, items] of Object.entries(payload.photos || {})) {
        photos[id] = persistPhotoItems('element', id, items);
      }
      for (const [id, items] of Object.entries(payload.instancePhotos || {})) {
        instancePhotos[id] = persistPhotoItems('instance', id, items);
      }
      for (const [id, items] of Object.entries(payload.elementFiles || {})) {
        elementFiles[id] = persistAttachmentItems('element', id, items);
      }
      for (const [id, items] of Object.entries(payload.instanceFiles || {})) {
        instanceFiles[id] = persistAttachmentItems('instance', id, items);
      }
      const state = rememberVersion(await backend.importAll({ db, photos, instancePhotos, elementFiles, instanceFiles }));
      return attachTables(state);
    });
  },

  async listPhotos(kind, ownerId) {
    return backend.listPhotos(kind, ownerId);
  },

  async addPhoto(kind, ownerId, dataUrl) {
    return enqueueWrite(async () => {
      const current = await backend.listPhotos(kind, ownerId);
      const saved = files.saveDataUrl('photos', uid('img'), dataUrl);
      const items = current.concat([saved.url]);
      await backend.replacePhotos(kind, ownerId, items);
      await rememberVersionAfterMutation();
      return { url: saved.url, version: currentVersion };
    });
  },

  async replacePhotos(kind, ownerId, items) {
    return enqueueWrite(async () => {
      const urls = persistPhotoItems(kind, ownerId, items);
      await backend.replacePhotos(kind, ownerId, urls);
      await rememberVersionAfterMutation();
      return urls;
    });
  },

  async deletePhotos(kind, ownerId) {
    return enqueueWrite(async () => {
      const urls = await backend.deletePhotos(kind, ownerId);
      removeUrls('photos', urls);
      await rememberVersionAfterMutation();
      return urls;
    });
  },

  async listAttachments(kind, ownerId) {
    return backend.listAttachments(kind, ownerId);
  },

  async addAttachment(kind, ownerId, body) {
    return enqueueWrite(async () => {
      const current = await backend.listAttachments(kind, ownerId);
      const id = body.id || uid('file');
      let item;
      if (body.dataUrl) {
        const saved = files.saveDataUrl('attachments', id, body.dataUrl, body.name);
        item = {
          id,
          name: body.name || saved.fileName,
          type: body.type || saved.mime || '',
          size: body.size || saved.size || 0,
          fileName: saved.fileName,
          url: saved.url,
          dataUrl: saved.url
        };
      } else {
        throw new Error('Brak zawartości załącznika.');
      }
      const items = current.concat([item]);
      await backend.replaceAttachments(kind, ownerId, items);
      await rememberVersionAfterMutation();
      return { ...item, version: currentVersion };
    });
  },

  async replaceAttachments(kind, ownerId, items) {
    return enqueueWrite(async () => {
      const normalized = persistAttachmentItems(kind, ownerId, items);
      await backend.replaceAttachments(kind, ownerId, normalized);
      await rememberVersionAfterMutation();
      return normalized;
    });
  },

  async deleteAttachments(kind, ownerId) {
    return enqueueWrite(async () => {
      const items = await backend.deleteAttachments(kind, ownerId);
      removeUrls('attachments', (items || []).map((i) => (typeof i === 'string' ? i : i.url)));
      await rememberVersionAfterMutation();
      return items;
    });
  },

  async saveTable({ id, groupId, name, table, date, file }) {
    return enqueueWrite(async () => {
      const tableId = id || uid('ttab');
      const written = files.writeJsonTable(tableId, table);
      let sourceFileName = null;
      if (file && file.buffer) {
        const saved = files.saveUpload('tables', tableId + '_src', file);
        sourceFileName = saved.fileName;
      }
      const meta = {
        id: tableId,
        groupId,
        name,
        table,
        date,
        dataFileName: written.fileName,
        sourceFileName
      };
      await backend.upsertTable(meta);
      await rememberVersionAfterMutation();
      return { ...meta, version: currentVersion };
    });
  },

  async updateTable(id, { name, table, date }) {
    return enqueueWrite(async () => {
      if (table) files.writeJsonTable(id, table);
      const meta = {
        id,
        groupId: null,
        name,
        table,
        date,
        dataFileName: id + '.json'
      };
      const state = await backend.loadState();
      const existing = (state.db.techTables || []).find((t) => t.id === id);
      if (existing) {
        meta.groupId = existing.groupId;
        meta.sourceFileName = existing.sourceFileName || null;
        meta.name = name != null ? name : existing.name;
        meta.date = date != null ? date : existing.date;
        meta.table = table || existing.table;
      }
      await backend.upsertTable(meta);
      await rememberVersionAfterMutation();
      return { ...meta, version: currentVersion };
    });
  },

  async deleteTable(id) {
    return enqueueWrite(async () => {
      const removed = await backend.deleteTable(id);
      files.removeFile('tables', id + '.json');
      if (removed && (removed.SourceFileName || removed.sourceFileName)) {
        files.removeFile('tables', removed.SourceFileName || removed.sourceFileName);
      }
      await rememberVersionAfterMutation();
      return removed;
    });
  }
};

module.exports = { initStore, store };
