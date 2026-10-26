'use strict';

const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('./logger');
const files = require('./files');
const routes = require('./routes');
const { initStore } = require('./store');

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '80mb' }));
app.use(express.urlencoded({ extended: true, limit: '80mb' }));

app.use((req, res, next) => {
  const started = Date.now();
  res.on('finish', () => logger.request(req, res, Date.now() - started));
  next();
});

app.use('/api', routes);
app.use('/media/zdjecia', express.static(config.photosDir));
app.use('/media/zalaczniki', express.static(config.attachmentsDir));
app.use('/media/tabele', express.static(config.tablesDir));
app.use(express.static(config.publicDir));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(config.publicDir, 'index.html'));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  logger.error('Błąd żądania', {
    path: req.originalUrl,
    method: req.method,
    status,
    error: err.message,
    stack: err.stack
  });
  res.status(status).json({
    message: err.expose || status < 500
      ? err.message
      : 'Wystąpił błąd serwera. Szczegóły zapisano w folderze logs.'
  });
});

process.on('uncaughtException', (err) => {
  logger.error('Nieobsłużony wyjątek procesu', { error: err.message, stack: err.stack });
});
process.on('unhandledRejection', (reason) => {
  const err = reason instanceof Error ? reason : new Error(String(reason));
  logger.error('Nieobsłużone odrzucenie Promise', { error: err.message, stack: err.stack });
});

async function start() {
  try {
    files.ensureStorageDirs();
    const backend = await initStore();
    app.listen(config.port, () => {
      logger.info('Serwer uruchomiony', {
        port: config.port,
        store: backend,
        photos: config.folderNames.photos,
        attachments: config.folderNames.attachments,
        tables: config.folderNames.tables
      });
      console.log(`Baza wiedzy produkcyjnej: http://localhost:${config.port}`);
    });
  } catch (err) {
    logger.error('Nie udało się uruchomić serwera', { error: err.message, stack: err.stack });
    process.exit(1);
  }
}

start();
