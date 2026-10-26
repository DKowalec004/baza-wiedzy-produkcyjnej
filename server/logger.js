'use strict';

const fs = require('fs');
const path = require('path');
const config = require('./config');

fs.mkdirSync(config.logsDir, { recursive: true });

function write(file, entry) {
  const line = JSON.stringify(entry) + '\n';
  fs.appendFile(path.join(config.logsDir, file), line, (err) => {
    if (err) console.error('Nie udało się zapisać logu:', err.message);
  });
}

function entry(level, message, extra) {
  const row = {
    ts: new Date().toISOString(),
    level,
    message,
    ...(extra && typeof extra === 'object' ? extra : extra ? { detail: String(extra) } : {})
  };
  write('app.log', row);
  if (level === 'error') write('error.log', row);
  const printer = level === 'error' ? console.error : console.log;
  printer(`[${row.ts}] ${level.toUpperCase()} ${message}${row.stack ? '\n' + row.stack : ''}`);
  return row;
}

module.exports = {
  info: (message, extra) => entry('info', message, extra),
  warn: (message, extra) => entry('warn', message, extra),
  error: (message, extra) => entry('error', message, extra),
  request(req, res, durationMs) {
    const pathName = req.originalUrl || req.path || '';
    if (pathName.split('?')[0] === '/api/state/version') return;
    write('access.log', {
      ts: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs,
      ip: req.ip
    });
  }
};
