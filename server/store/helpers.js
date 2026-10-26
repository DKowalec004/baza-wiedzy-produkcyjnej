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
  return { version: 0, db: emptyDb(), ...emptyMedia() };
}

function nextVersion(version) {
  return (Number(version) || 0) + 1;
}

function versionConflict(currentState) {
  const err = new Error('Dane zmienił ktoś inny. Widok odświeżono — zapisz ponownie.');
  err.status = 409;
  err.expose = true;
  err.code = 'VERSION_CONFLICT';
  err.payload = currentState;
  return err;
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

module.exports = { emptyDb, emptyMedia, emptyState, normalizeDb, uid, nextVersion, versionConflict };
