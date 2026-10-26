'use strict';

function emptyDb() {
  return {
    departments: [],
    elements: [],
    instances: [],
    informations: [],
    elementInformations: [],
    elementNotes: [],
    instanceNotes: [],
    techGroups: [],
    techInfos: [],
    techTables: []
  };
}

function emptyMedia() {
  return { photos: {}, instancePhotos: {}, elementFiles: {}, instanceFiles: {} };
}

function emptyState() {
  return { db: emptyDb(), ...emptyMedia() };
}

function normalizeDb(db) {
  const out = emptyDb();
  if (!db) return out;
  for (const key of Object.keys(out)) out[key] = Array.isArray(db[key]) ? db[key] : [];
  return out;
}

function uid(prefix) {
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

module.exports = { emptyDb, emptyMedia, emptyState, normalizeDb, uid };
