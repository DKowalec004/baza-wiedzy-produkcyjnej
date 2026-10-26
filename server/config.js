'use strict';

const path = require('path');
const fs = require('fs');

const packageRoot = path.resolve(__dirname, '..');
require('dotenv').config({ path: path.join(packageRoot, '.env') });

function bool(value, fallback) {
  if (value == null || value === '') return fallback;
  return String(value).toLowerCase() === 'true' || value === '1';
}

function envText(name, fallback) {
  const value = process.env[name];
  if (value == null || String(value).trim() === '') return fallback;
  return String(value).trim();
}

function resolveRoot() {
  const fromEnv = envText('APP_ROOT', '');
  if (!fromEnv) return packageRoot;
  return path.isAbsolute(fromEnv) ? path.normalize(fromEnv) : path.resolve(packageRoot, fromEnv);
}

const rootDir = resolveRoot();

const folderNames = {
  public: envText('PUBLIC_DIR', 'public'),
  photos: envText('PHOTOS_DIR', 'Zdjęcia'),
  attachments: envText('ATTACHMENTS_DIR', 'Załączniki'),
  tables: envText('TABLES_DIR', 'tabele'),
  logs: envText('LOGS_DIR', 'logs'),
  data: envText('DATA_DIR', 'data')
};

function appPath(...segments) {
  return path.join(rootDir, ...segments);
}

function relativeFromRoot(absolutePath) {
  const rel = path.relative(rootDir, absolutePath);
  if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) return folderNameOrBasename(absolutePath);
  return rel.split(path.sep).join('/');
}

function folderNameOrBasename(absolutePath) {
  return path.basename(absolutePath);
}

function ensureExists(dir) {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

module.exports = {
  port: Number(process.env.PORT || 3000),
  rootDir,
  folderNames,
  publicDir: appPath(folderNames.public),
  photosDir: appPath(folderNames.photos),
  attachmentsDir: appPath(folderNames.attachments),
  tablesDir: appPath(folderNames.tables),
  logsDir: appPath(folderNames.logs),
  dataDir: appPath(folderNames.data),
  stateFile: appPath(folderNames.data, 'state.json'),
  backupFile: appPath(envText('BACKUP_FILE', 'baza-wiedzy-produkcyjnej-kopia-2026-10-23.json')),
  appPath,
  relativeFromRoot,
  ensureExists,
  mssqlEnabled: bool(process.env.MSSQL_ENABLED, true),
  mssql: {
    server: envText('MSSQL_SERVER', 'localhost'),
    port: Number(process.env.MSSQL_PORT || 1433),
    database: envText('MSSQL_DATABASE', 'BazaWiedzyProdukcyjnej'),
    user: envText('MSSQL_USER', 'sa'),
    password: process.env.MSSQL_PASSWORD || '',
    connectionString: process.env.MSSQL_CONNECTION_STRING || '',
    options: {
      encrypt: bool(process.env.MSSQL_ENCRYPT, false),
      trustServerCertificate: bool(process.env.MSSQL_TRUST_SERVER_CERTIFICATE, true)
    }
  }
};
