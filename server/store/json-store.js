'use strict';

const fs = require('fs');
const config = require('../config');
const files = require('../files');
const { emptyState, normalizeDb, nextVersion } = require('./helpers');

function readStateFile() {
  if (!fs.existsSync(config.stateFile)) return emptyState();
  const raw = JSON.parse(fs.readFileSync(config.stateFile, 'utf8'));
  return {
    version: Number(raw.version) || 0,
    db: normalizeDb(raw.db),
    photos: raw.photos || {},
    instancePhotos: raw.instancePhotos || {},
    elementFiles: raw.elementFiles || {},
    instanceFiles: raw.instanceFiles || {}
  };
}

function writeStateFile(state) {
  files.ensureStorageDirs();
  fs.writeFileSync(config.stateFile, JSON.stringify(state, null, 2), 'utf8');
}

function mutate(writer) {
  const state = readStateFile();
  const extra = writer(state);
  state.version = nextVersion(state.version);
  writeStateFile(state);
  return extra !== undefined ? extra : state;
}

function mediaKey(kind) {
  return kind === 'instance' ? 'instancePhotos' : 'photos';
}

function filesKey(kind) {
  return kind === 'instance' ? 'instanceFiles' : 'elementFiles';
}

const jsonStore = {
  async getVersion() {
    return Number(readStateFile().version) || 0;
  },

  async loadState() {
    return readStateFile();
  },

  async saveDb(db) {
    return mutate((state) => {
      state.db = normalizeDb(db);
    });
  },

  async importAll(payload) {
    const previous = fs.existsSync(config.stateFile) ? readStateFile() : emptyState();
    const state = {
      version: nextVersion(previous.version),
      db: normalizeDb(payload.db),
      photos: payload.photos || {},
      instancePhotos: payload.instancePhotos || {},
      elementFiles: payload.elementFiles || {},
      instanceFiles: payload.instanceFiles || {}
    };
    writeStateFile(state);
    return state;
  },

  async listPhotos(kind, ownerId) {
    const state = readStateFile();
    return state[mediaKey(kind)][ownerId] || [];
  },

  async replacePhotos(kind, ownerId, items) {
    return mutate((state) => {
      state[mediaKey(kind)][ownerId] = items;
      return items;
    });
  },

  async deletePhotos(kind, ownerId) {
    return mutate((state) => {
      const items = state[mediaKey(kind)][ownerId] || [];
      delete state[mediaKey(kind)][ownerId];
      return items;
    });
  },

  async listAttachments(kind, ownerId) {
    const state = readStateFile();
    return state[filesKey(kind)][ownerId] || [];
  },

  async replaceAttachments(kind, ownerId, items) {
    return mutate((state) => {
      state[filesKey(kind)][ownerId] = items;
      return items;
    });
  },

  async deleteAttachments(kind, ownerId) {
    return mutate((state) => {
      const items = state[filesKey(kind)][ownerId] || [];
      delete state[filesKey(kind)][ownerId];
      return items;
    });
  },

  async upsertTable(meta) {
    return mutate((state) => {
      const idx = state.db.techTables.findIndex((t) => t.id === meta.id);
      const row = {
        id: meta.id,
        groupId: meta.groupId,
        name: meta.name,
        table: meta.table,
        date: meta.date || '',
        sourceFileName: meta.sourceFileName || null
      };
      if (idx >= 0) state.db.techTables[idx] = { ...state.db.techTables[idx], ...row };
      else state.db.techTables.push(row);
      return row;
    });
  },

  async deleteTable(id) {
    return mutate((state) => {
      const item = state.db.techTables.find((t) => t.id === id);
      state.db.techTables = state.db.techTables.filter((t) => t.id !== id);
      return item || null;
    });
  }
};

module.exports = jsonStore;
