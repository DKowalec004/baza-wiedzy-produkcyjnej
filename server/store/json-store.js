'use strict';

const fs = require('fs');
const config = require('../config');
const files = require('../files');
const { emptyState, normalizeDb } = require('./helpers');

function readStateFile() {
  if (!fs.existsSync(config.stateFile)) return emptyState();
  const raw = JSON.parse(fs.readFileSync(config.stateFile, 'utf8'));
  return {
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

function mediaKey(kind) {
  return kind === 'instance' ? 'instancePhotos' : 'photos';
}

function filesKey(kind) {
  return kind === 'instance' ? 'instanceFiles' : 'elementFiles';
}

const jsonStore = {
  async loadState() {
    return readStateFile();
  },

  async saveDb(db) {
    const state = readStateFile();
    state.db = normalizeDb(db);
    writeStateFile(state);
    return state;
  },

  async importAll(payload) {
    const state = {
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
    const state = readStateFile();
    state[mediaKey(kind)][ownerId] = items;
    writeStateFile(state);
    return items;
  },

  async deletePhotos(kind, ownerId) {
    const state = readStateFile();
    const items = state[mediaKey(kind)][ownerId] || [];
    delete state[mediaKey(kind)][ownerId];
    writeStateFile(state);
    return items;
  },

  async listAttachments(kind, ownerId) {
    const state = readStateFile();
    return state[filesKey(kind)][ownerId] || [];
  },

  async replaceAttachments(kind, ownerId, items) {
    const state = readStateFile();
    state[filesKey(kind)][ownerId] = items;
    writeStateFile(state);
    return items;
  },

  async deleteAttachments(kind, ownerId) {
    const state = readStateFile();
    const items = state[filesKey(kind)][ownerId] || [];
    delete state[filesKey(kind)][ownerId];
    writeStateFile(state);
    return items;
  },

  async upsertTable(meta) {
    const state = readStateFile();
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
    writeStateFile(state);
    return row;
  },

  async deleteTable(id) {
    const state = readStateFile();
    const item = state.db.techTables.find((t) => t.id === id);
    state.db.techTables = state.db.techTables.filter((t) => t.id !== id);
    writeStateFile(state);
    return item || null;
  }
};

module.exports = jsonStore;
