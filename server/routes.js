'use strict';

const express = require('express');
const multer = require('multer');
const { store } = require('./store');
const logger = require('./logger');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });
const router = express.Router();

function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

function assertOwner(kind) {
  if (kind !== 'element' && kind !== 'instance') {
    const err = new Error('Nieobsługiwany właściciel pliku.');
    err.status = 400;
    err.expose = true;
    throw err;
  }
}

router.get('/health', (req, res) => {
  res.json({ ok: true, store: store.name() });
});

router.get('/state', asyncHandler(async (req, res) => {
  const state = await store.loadState();
  res.json(state);
}));

router.put('/state', asyncHandler(async (req, res) => {
  if (!req.body || !req.body.db) {
    const err = new Error('Brak danych do zapisu.');
    err.status = 400;
    err.expose = true;
    throw err;
  }
  const state = await store.saveState(req.body.db);
  logger.info('Zapisano stan aplikacji', { store: store.name() });
  res.json(state);
}));

router.post('/import', asyncHandler(async (req, res) => {
  if (!req.body || !req.body.db) {
    const err = new Error('Niepoprawny plik importu.');
    err.status = 400;
    err.expose = true;
    throw err;
  }
  const state = await store.importAll(req.body);
  logger.info('Zaimportowano kopię zapasową');
  res.json(state);
}));

router.get('/photos/:kind/:ownerId', asyncHandler(async (req, res) => {
  assertOwner(req.params.kind);
  res.json({ items: await store.listPhotos(req.params.kind, req.params.ownerId) });
}));

router.post('/photos', asyncHandler(async (req, res) => {
  const { ownerType, ownerId, dataUrl } = req.body || {};
  assertOwner(ownerType);
  if (!dataUrl) {
    const err = new Error('Brak zdjęcia do zapisu.');
    err.status = 400;
    err.expose = true;
    throw err;
  }
  const created = await store.addPhoto(ownerType, ownerId, dataUrl);
  res.status(201).json(created);
}));

router.put('/photos/:kind/:ownerId', asyncHandler(async (req, res) => {
  assertOwner(req.params.kind);
  const items = (req.body && (req.body.items || req.body.urls)) || [];
  const saved = await store.replacePhotos(req.params.kind, req.params.ownerId, items);
  res.json({ items: saved });
}));

router.delete('/photos/:kind/:ownerId', asyncHandler(async (req, res) => {
  assertOwner(req.params.kind);
  await store.deletePhotos(req.params.kind, req.params.ownerId);
  res.status(204).end();
}));

router.get('/attachments/:kind/:ownerId', asyncHandler(async (req, res) => {
  assertOwner(req.params.kind);
  res.json({ items: await store.listAttachments(req.params.kind, req.params.ownerId) });
}));

router.post('/attachments', asyncHandler(async (req, res) => {
  const body = req.body || {};
  assertOwner(body.ownerType);
  const created = await store.addAttachment(body.ownerType, body.ownerId, body);
  res.status(201).json(created);
}));

router.put('/attachments/:kind/:ownerId', asyncHandler(async (req, res) => {
  assertOwner(req.params.kind);
  const items = (req.body && req.body.items) || [];
  const saved = await store.replaceAttachments(req.params.kind, req.params.ownerId, items);
  res.json({ items: saved });
}));

router.delete('/attachments/:kind/:ownerId', asyncHandler(async (req, res) => {
  assertOwner(req.params.kind);
  await store.deleteAttachments(req.params.kind, req.params.ownerId);
  res.status(204).end();
}));

router.post('/tables', upload.single('file'), asyncHandler(async (req, res) => {
  const table = typeof req.body.table === 'string' ? JSON.parse(req.body.table) : req.body.table;
  if (!req.body.name || !table) {
    const err = new Error('Tytuł i dane tabeli są wymagane.');
    err.status = 400;
    err.expose = true;
    throw err;
  }
  const saved = await store.saveTable({
    id: req.body.id,
    groupId: req.body.groupId,
    name: req.body.name,
    table,
    date: req.body.date,
    file: req.file
  });
  logger.info('Zapisano tabelę', { id: saved.id, file: saved.sourceFileName });
  res.status(201).json(saved);
}));

router.put('/tables/:id', asyncHandler(async (req, res) => {
  const saved = await store.updateTable(req.params.id, req.body || {});
  res.json(saved);
}));

router.delete('/tables/:id', asyncHandler(async (req, res) => {
  await store.deleteTable(req.params.id);
  res.status(204).end();
}));

module.exports = router;
