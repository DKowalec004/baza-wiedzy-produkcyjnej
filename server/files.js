'use strict';

const fs = require('fs');
const path = require('path');
const config = require('./config');
const logger = require('./logger');

const FOLDERS = {
  photos: { dir: config.photosDir, url: '/media/zdjecia' },
  attachments: { dir: config.attachmentsDir, url: '/media/zalaczniki' },
  tables: { dir: config.tablesDir, url: '/media/tabele' }
};

function ensureStorageDirs() {
  [config.photosDir, config.attachmentsDir, config.tablesDir, config.logsDir, config.dataDir]
    .forEach((dir) => fs.mkdirSync(dir, { recursive: true }));
}

function safeName(name) {
  return String(name || 'plik').replace(/[\\/:*?"<>|]+/g, '_').replace(/\s+/g, ' ').trim() || 'plik';
}

function extFromMime(mime, fallback) {
  if (!mime) return fallback;
  if (mime.includes('jpeg')) return '.jpg';
  if (mime.includes('png')) return '.png';
  if (mime.includes('gif')) return '.gif';
  if (mime.includes('webp')) return '.webp';
  if (mime.includes('pdf')) return '.pdf';
  return fallback;
}

function parseDataUrl(dataUrl) {
  const match = /^data:([^;]+);base64,([\s\S]+)$/.exec(dataUrl || '');
  if (!match) return null;
  return { mime: match[1], buffer: Buffer.from(match[2], 'base64') };
}

function isDataUrl(value) {
  return typeof value === 'string' && value.startsWith('data:');
}

function isStoredUrl(value) {
  return typeof value === 'string' && value.startsWith('/media/');
}

function publicUrl(kind, fileName) {
  return FOLDERS[kind].url + '/' + encodeURIComponent(fileName);
}

function filePath(kind, fileName) {
  const name = path.basename(String(fileName || '').replace(/\\/g, '/'));
  if (!name || name === '.' || name === '..') {
    throw new Error('Niepoprawna nazwa pliku.');
  }
  return path.join(FOLDERS[kind].dir, name);
}

function writeBuffer(kind, fileName, buffer) {
  ensureStorageDirs();
  const dest = filePath(kind, fileName);
  fs.writeFileSync(dest, buffer);
  return { fileName, url: publicUrl(kind, fileName), path: dest };
}

function saveDataUrl(kind, id, dataUrl, originalName) {
  const parsed = parseDataUrl(dataUrl);
  if (!parsed) throw new Error('Niepoprawny plik w formacie data URL.');
  const ext = originalName && path.extname(originalName)
    ? path.extname(originalName)
    : extFromMime(parsed.mime, kind === 'photos' ? '.jpg' : '.bin');
  const fileName = `${id}${ext}`;
  return { ...writeBuffer(kind, fileName, parsed.buffer), mime: parsed.mime, size: parsed.buffer.length };
}

function saveUpload(kind, id, file) {
  const ext = path.extname(file.originalname || '') || extFromMime(file.mimetype, '');
  const fileName = `${id}${ext || ''}`;
  return {
    ...writeBuffer(kind, fileName, file.buffer),
    mime: file.mimetype || '',
    size: file.size || file.buffer.length,
    originalName: safeName(file.originalname)
  };
}

function findTableSource(id) {
  ensureStorageDirs();
  const found = fs.readdirSync(config.tablesDir).find((name) => name.startsWith(id + '_src'));
  return found || null;
}

function writeJsonTable(id, table) {
  ensureStorageDirs();
  const fileName = `${id}.json`;
  fs.writeFileSync(filePath('tables', fileName), JSON.stringify(table, null, 2), 'utf8');
  return { fileName, url: publicUrl('tables', fileName) };
}

function readJsonTable(fileName) {
  const dest = filePath('tables', fileName);
  if (!fs.existsSync(dest)) return null;
  return JSON.parse(fs.readFileSync(dest, 'utf8'));
}

function removeFile(kind, fileName) {
  if (!fileName) return;
  const dest = filePath(kind, fileName);
  try {
    if (fs.existsSync(dest)) fs.unlinkSync(dest);
  } catch (err) {
    logger.warn('Nie udało się usunąć pliku', { kind, fileName, error: err.message });
  }
}

function fileNameFromUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const clean = url.split('?')[0];
  const parts = clean.split('/');
  return decodeURIComponent(parts[parts.length - 1] || '');
}

function persistImageField(id, value) {
  if (!value) return null;
  if (isStoredUrl(value)) return value;
  if (isDataUrl(value)) return saveDataUrl('photos', id, value).url;
  return value;
}

module.exports = {
  FOLDERS,
  ensureStorageDirs,
  safeName,
  isDataUrl,
  isStoredUrl,
  publicUrl,
  filePath,
  saveDataUrl,
  saveUpload,
  writeJsonTable,
  findTableSource,
  readJsonTable,
  removeFile,
  fileNameFromUrl,
  persistImageField
};
