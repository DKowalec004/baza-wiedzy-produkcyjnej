'use strict';

const sql = require('mssql');
const config = require('../config');
const logger = require('../logger');
const { emptyState, normalizeDb } = require('./helpers');

let pool = null;

function mssqlConfig() {
  if (config.mssql.connectionString) {
    return config.mssql.connectionString;
  }
  return {
    server: config.mssql.server,
    port: config.mssql.port,
    database: config.mssql.database,
    user: config.mssql.user,
    password: config.mssql.password,
    options: config.mssql.options,
    pool: { max: 10, min: 0, idleTimeoutMillis: 30000 }
  };
}

async function getPool() {
  if (pool && pool.connected) return pool;
  pool = await sql.connect(mssqlConfig());
  logger.info('Połączono z MSSQL', { database: config.mssql.database, server: config.mssql.server });
  return pool;
}

async function ensureAppMeta(transaction) {
  await req(transaction).query(`
    IF OBJECT_ID(N'dbo.AppMeta', N'U') IS NULL
    BEGIN
      CREATE TABLE dbo.AppMeta (
        Id INT NOT NULL PRIMARY KEY,
        Version INT NOT NULL CONSTRAINT DF_AppMeta_Version DEFAULT (0),
        CONSTRAINT CK_AppMeta_Single CHECK (Id = 1)
      );
      INSERT INTO dbo.AppMeta (Id, Version) VALUES (1, 0);
    END
    IF NOT EXISTS (SELECT 1 FROM dbo.AppMeta WHERE Id = 1)
      INSERT INTO dbo.AppMeta (Id, Version) VALUES (1, 0);
  `);
}

async function readVersion(transaction) {
  await ensureAppMeta(transaction);
  const rows = await queryAll('SELECT Version FROM dbo.AppMeta WHERE Id = 1', transaction);
  return rows[0] ? Number(rows[0].Version) || 0 : 0;
}

async function incrementVersion(transaction) {
  await ensureAppMeta(transaction);
  await req(transaction).query('UPDATE dbo.AppMeta SET Version = Version + 1 WHERE Id = 1');
  return readVersion(transaction);
}

function req(transaction) {
  return new sql.Request(transaction || pool);
}

async function queryAll(text, transaction) {
  const result = await req(transaction).query(text);
  return result.recordset || [];
}

function bind(request, name, type, value) {
  request.input(name, type, value);
  return request;
}

async function loadStateFromDb(transaction) {
  const departments = await queryAll('SELECT Id, Name, PhotoPath, SortOrder FROM dbo.Departments ORDER BY SortOrder, Name', transaction);
  const elements = await queryAll('SELECT Id, DepartmentId, Name, SortOrder FROM dbo.Elements ORDER BY SortOrder, Name', transaction);
  const instances = await queryAll('SELECT Id, ElementId, Name, [IndexCode] AS IndexCode, WinKlima, Skrot, SortOrder FROM dbo.Instances ORDER BY SortOrder, Name', transaction);
  const informations = await queryAll('SELECT Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder FROM dbo.InstanceInformations ORDER BY SortOrder, Name', transaction);
  const elementInformations = await queryAll('SELECT Id, ElementId, Name, Description, Optional, SortOrder FROM dbo.ElementInformations ORDER BY SortOrder, Name', transaction);
  const notes = await queryAll('SELECT Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder FROM dbo.Notes ORDER BY SortOrder, DateUtc', transaction);
  const links = await queryAll('SELECT NoteId, TargetType, TargetId, SortOrder FROM dbo.NoteLinks ORDER BY SortOrder', transaction);
  const techGroups = await queryAll('SELECT Id, Name, SortOrder FROM dbo.TechGroups ORDER BY SortOrder, Name', transaction);
  const techInfos = await queryAll('SELECT Id, GroupId, Name, Description, Optional, SortOrder FROM dbo.TechInfos ORDER BY SortOrder, Name', transaction);
  const techTables = await queryAll('SELECT Id, GroupId, Name, DateUtc, SourceFileName, DataFileName, SortOrder FROM dbo.TechTables ORDER BY SortOrder, Name', transaction);
  const photos = await queryAll('SELECT Id, OwnerType, OwnerId, FileName, Url, SortOrder FROM dbo.Photos ORDER BY SortOrder', transaction);
  const attachments = await queryAll('SELECT Id, OwnerType, OwnerId, OriginalName, FileName, Url, MimeType, SizeBytes, SortOrder FROM dbo.Attachments ORDER BY SortOrder', transaction);

  const linksByNote = {};
  for (const link of links) {
    (linksByNote[link.NoteId] || (linksByNote[link.NoteId] = [])).push({
      type: link.TargetType,
      id: link.TargetId
    });
  }

  const mapNote = (row) => ({
    id: row.Id,
    kind: row.Kind,
    name: row.Name || '',
    description: row.Description || '',
    diameter: row.Diameter,
    client: row.Client || '',
    za: row.Za || '',
    date: row.DateUtc ? new Date(row.DateUtc).toISOString() : '',
    links: linksByNote[row.Id] || []
  });

  const db = normalizeDb({
    departments: departments.map((r) => ({ id: r.Id, name: r.Name, photo: r.PhotoPath || undefined })),
    elements: elements.map((r) => ({ id: r.Id, departmentId: r.DepartmentId, name: r.Name })),
    instances: instances.map((r) => ({
      id: r.Id, elementId: r.ElementId, name: r.Name,
      index: r.IndexCode || '', winklima: r.WinKlima || '', skrot: r.Skrot || ''
    })),
    informations: informations.map((r) => ({
      id: r.Id, instanceId: r.InstanceId, name: r.Name, description: r.Description || '',
      optional: !!r.Optional, type: r.Type || 'info', photo: r.PhotoPath || undefined
    })),
    elementInformations: elementInformations.map((r) => ({
      id: r.Id, elementId: r.ElementId, name: r.Name, description: r.Description || '', optional: !!r.Optional
    })),
    elementNotes: notes.filter((n) => n.Scope === 'element').map((n) => ({ ...mapNote(n), elementId: n.OwnerId })),
    instanceNotes: notes.filter((n) => n.Scope === 'instance').map((n) => ({ ...mapNote(n), instanceId: n.OwnerId })),
    techGroups: techGroups.map((r) => ({ id: r.Id, name: r.Name })),
    techInfos: techInfos.map((r) => ({
      id: r.Id, groupId: r.GroupId, name: r.Name, description: r.Description || '', optional: !!r.Optional
    })),
    techTables: techTables.map((r) => ({
      id: r.Id, groupId: r.GroupId, name: r.Name,
      date: r.DateUtc ? new Date(r.DateUtc).toISOString() : '',
      sourceFileName: r.SourceFileName || null,
      dataFileName: r.DataFileName,
      table: null
    }))
  });

  const photoMap = { element: {}, instance: {} };
  for (const p of photos) {
    if (!photoMap[p.OwnerType]) continue;
    (photoMap[p.OwnerType][p.OwnerId] || (photoMap[p.OwnerType][p.OwnerId] = [])).push(p.Url);
  }
  const fileMap = { element: {}, instance: {} };
  for (const f of attachments) {
    if (!fileMap[f.OwnerType]) continue;
    (fileMap[f.OwnerType][f.OwnerId] || (fileMap[f.OwnerType][f.OwnerId] = [])).push({
      id: f.Id,
      name: f.OriginalName,
      type: f.MimeType || '',
      size: Number(f.SizeBytes) || 0,
      url: f.Url,
      dataUrl: f.Url
    });
  }

  return {
    version: await readVersion(transaction),
    db,
    photos: photoMap.element,
    instancePhotos: photoMap.instance,
    elementFiles: fileMap.element,
    instanceFiles: fileMap.instance,
    _tableFiles: Object.fromEntries(techTables.map((t) => [t.Id, t.DataFileName]))
  };
}

async function exec(transaction, text, inputs) {
  const request = req(transaction);
  for (const [name, type, value] of inputs || []) request.input(name, type, value);
  await request.query(text);
}

async function replaceRows(transaction, db) {
  await req(transaction).query(`
    DELETE FROM dbo.NoteLinks;
    DELETE FROM dbo.Notes;
    DELETE FROM dbo.InstanceInformations;
    DELETE FROM dbo.ElementInformations;
    DELETE FROM dbo.TechInfos;
    DELETE FROM dbo.TechTables;
    DELETE FROM dbo.Instances;
    DELETE FROM dbo.Elements;
    DELETE FROM dbo.Departments;
    DELETE FROM dbo.TechGroups;
  `);

  let order = 0;
  for (const d of db.departments) {
    await exec(transaction, `
      INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder)
      VALUES (@id, @name, @photo, @ord)`, [
      ['id', sql.NVarChar(64), d.id],
      ['name', sql.NVarChar(500), d.name || ''],
      ['photo', sql.NVarChar(1000), d.photo || null],
      ['ord', sql.Int, order++]
    ]);
  }
  order = 0;
  for (const e of db.elements) {
    await exec(transaction, `
      INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder)
      VALUES (@id, @dept, @name, @ord)`, [
      ['id', sql.NVarChar(64), e.id],
      ['dept', sql.NVarChar(64), e.departmentId],
      ['name', sql.NVarChar(500), e.name || ''],
      ['ord', sql.Int, order++]
    ]);
  }
  order = 0;
  for (const i of db.instances) {
    await exec(transaction, `
      INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder)
      VALUES (@id, @el, @name, @idx, @wk, @sk, @ord)`, [
      ['id', sql.NVarChar(64), i.id],
      ['el', sql.NVarChar(64), i.elementId],
      ['name', sql.NVarChar(500), i.name || ''],
      ['idx', sql.NVarChar(200), i.index || null],
      ['wk', sql.NVarChar(200), i.winklima || null],
      ['sk', sql.NVarChar(200), i.skrot || null],
      ['ord', sql.Int, order++]
    ]);
  }
  order = 0;
  for (const info of db.elementInformations) {
    await exec(transaction, `
      INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder)
      VALUES (@id, @el, @name, @desc, @opt, @ord)`, [
      ['id', sql.NVarChar(64), info.id],
      ['el', sql.NVarChar(64), info.elementId],
      ['name', sql.NVarChar(500), info.name || ''],
      ['desc', sql.NVarChar(sql.MAX), info.description || ''],
      ['opt', sql.Bit, info.optional ? 1 : 0],
      ['ord', sql.Int, order++]
    ]);
  }
  order = 0;
  for (const info of db.informations) {
    await exec(transaction, `
      INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder)
      VALUES (@id, @inst, @name, @desc, @opt, @typ, @photo, @ord)`, [
      ['id', sql.NVarChar(64), info.id],
      ['inst', sql.NVarChar(64), info.instanceId],
      ['name', sql.NVarChar(500), info.name || ''],
      ['desc', sql.NVarChar(sql.MAX), info.description || ''],
      ['opt', sql.Bit, info.optional ? 1 : 0],
      ['typ', sql.NVarChar(20), info.type || 'info'],
      ['photo', sql.NVarChar(1000), info.photo || null],
      ['ord', sql.Int, order++]
    ]);
  }

  const insertNotes = async (list, scope, ownerKey) => {
    let n = 0;
    for (const note of list) {
      await exec(transaction, `
        INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder)
        VALUES (@id, @scope, @owner, @kind, @name, @desc, @dia, @client, @za, @date, @ord)`, [
        ['id', sql.NVarChar(64), note.id],
        ['scope', sql.NVarChar(20), scope],
        ['owner', sql.NVarChar(64), note[ownerKey]],
        ['kind', sql.NVarChar(20), note.kind || 'general'],
        ['name', sql.NVarChar(500), note.name || null],
        ['desc', sql.NVarChar(sql.MAX), note.description || ''],
        ['dia', sql.Float, note.diameter == null ? null : Number(note.diameter)],
        ['client', sql.NVarChar(500), note.client || null],
        ['za', sql.NVarChar(200), note.za || null],
        ['date', sql.DateTime2, note.date ? new Date(note.date) : null],
        ['ord', sql.Int, n++]
      ]);
      let li = 0;
      for (const link of note.links || []) {
        await exec(transaction, `
          INSERT INTO dbo.NoteLinks (NoteId, TargetType, TargetId, SortOrder)
          VALUES (@nid, @typ, @tid, @ord)`, [
          ['nid', sql.NVarChar(64), note.id],
          ['typ', sql.NVarChar(20), link.type],
          ['tid', sql.NVarChar(64), link.id],
          ['ord', sql.Int, li++]
        ]);
      }
    }
  };
  await insertNotes(db.elementNotes, 'element', 'elementId');
  await insertNotes(db.instanceNotes, 'instance', 'instanceId');

  order = 0;
  for (const g of db.techGroups) {
    await exec(transaction, `
      INSERT INTO dbo.TechGroups (Id, Name, SortOrder) VALUES (@id, @name, @ord)`, [
      ['id', sql.NVarChar(64), g.id],
      ['name', sql.NVarChar(500), g.name || ''],
      ['ord', sql.Int, order++]
    ]);
  }
  order = 0;
  for (const info of db.techInfos) {
    await exec(transaction, `
      INSERT INTO dbo.TechInfos (Id, GroupId, Name, Description, Optional, SortOrder)
      VALUES (@id, @gid, @name, @desc, @opt, @ord)`, [
      ['id', sql.NVarChar(64), info.id],
      ['gid', sql.NVarChar(64), info.groupId],
      ['name', sql.NVarChar(500), info.name || ''],
      ['desc', sql.NVarChar(sql.MAX), info.description || ''],
      ['opt', sql.Bit, info.optional ? 1 : 0],
      ['ord', sql.Int, order++]
    ]);
  }
  order = 0;
  for (const t of db.techTables) {
    await exec(transaction, `
      INSERT INTO dbo.TechTables (Id, GroupId, Name, DateUtc, SourceFileName, DataFileName, SortOrder)
      VALUES (@id, @gid, @name, @date, @src, @data, @ord)`, [
      ['id', sql.NVarChar(64), t.id],
      ['gid', sql.NVarChar(64), t.groupId],
      ['name', sql.NVarChar(500), t.name || ''],
      ['date', sql.DateTime2, t.date ? new Date(t.date) : null],
      ['src', sql.NVarChar(500), t.sourceFileName || null],
      ['data', sql.NVarChar(500), t.dataFileName || (t.id + '.json')],
      ['ord', sql.Int, order++]
    ]);
  }
}

async function withTransaction(fn) {
  const connection = await getPool();
  const transaction = new sql.Transaction(connection);
  await transaction.begin();
  try {
    const result = await fn(transaction);
    await transaction.commit();
    return result;
  } catch (err) {
    try { await transaction.rollback(); } catch (e) { /* already rolled back */ }
    throw err;
  }
}

const mssqlStore = {
  async connect() {
    await getPool();
    await ensureAppMeta();
  },

  async getVersion() {
    await getPool();
    return readVersion();
  },

  async loadState() {
    await getPool();
    return loadStateFromDb();
  },

  async saveDb(db) {
    return withTransaction(async (tx) => {
      await replaceRows(tx, normalizeDb(db));
      await incrementVersion(tx);
      return loadStateFromDb(tx);
    });
  },

  async importAll(payload) {
    return withTransaction(async (tx) => {
      await req(tx).query(`
        DELETE FROM dbo.NoteLinks;
        DELETE FROM dbo.Notes;
        DELETE FROM dbo.InstanceInformations;
        DELETE FROM dbo.ElementInformations;
        DELETE FROM dbo.TechInfos;
        DELETE FROM dbo.TechTables;
        DELETE FROM dbo.Photos;
        DELETE FROM dbo.Attachments;
        DELETE FROM dbo.Instances;
        DELETE FROM dbo.Elements;
        DELETE FROM dbo.Departments;
        DELETE FROM dbo.TechGroups;
      `);
      await replaceRows(tx, normalizeDb(payload.db));
      const writePhotos = async (map, kind) => {
        let ord = 0;
        for (const [ownerId, items] of Object.entries(map || {})) {
          for (const url of items) {
            const fileName = String(url).split('/').pop();
            await exec(tx, `
              INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder)
              VALUES (@id, @kind, @owner, @fn, @url, @ord)`, [
              ['id', sql.NVarChar(64), `${kind}_${ownerId}_${ord}`],
              ['kind', sql.NVarChar(20), kind],
              ['owner', sql.NVarChar(64), ownerId],
              ['fn', sql.NVarChar(500), decodeURIComponent(fileName || '')],
              ['url', sql.NVarChar(1000), url],
              ['ord', sql.Int, ord++]
            ]);
          }
        }
      };
      await writePhotos(payload.photos, 'element');
      await writePhotos(payload.instancePhotos, 'instance');
      const writeFiles = async (map, kind) => {
        let ord = 0;
        for (const [ownerId, items] of Object.entries(map || {})) {
          for (const item of items) {
            await exec(tx, `
              INSERT INTO dbo.Attachments (Id, OwnerType, OwnerId, OriginalName, FileName, Url, MimeType, SizeBytes, SortOrder)
              VALUES (@id, @kind, @owner, @oname, @fn, @url, @mime, @size, @ord)`, [
              ['id', sql.NVarChar(64), item.id],
              ['kind', sql.NVarChar(20), kind],
              ['owner', sql.NVarChar(64), ownerId],
              ['oname', sql.NVarChar(500), item.name || 'plik'],
              ['fn', sql.NVarChar(500), item.fileName || decodeURIComponent(String(item.url || '').split('/').pop() || '')],
              ['url', sql.NVarChar(1000), item.url],
              ['mime', sql.NVarChar(200), item.type || ''],
              ['size', sql.BigInt, item.size || 0],
              ['ord', sql.Int, ord++]
            ]);
          }
        }
      };
      await writeFiles(payload.elementFiles, 'element');
      await writeFiles(payload.instanceFiles, 'instance');
      await incrementVersion(tx);
      return loadStateFromDb(tx);
    });
  },

  async listPhotos(kind, ownerId) {
    await getPool();
    const rows = await queryAll(`
      SELECT Url FROM dbo.Photos
      WHERE OwnerType = '${kind.replace(/'/g, '')}' AND OwnerId = '${String(ownerId).replace(/'/g, '')}'
      ORDER BY SortOrder`);
    return rows.map((r) => r.Url);
  },

  async replacePhotos(kind, ownerId, items) {
    return withTransaction(async (tx) => {
      await exec(tx, 'DELETE FROM dbo.Photos WHERE OwnerType = @kind AND OwnerId = @owner', [
        ['kind', sql.NVarChar(20), kind],
        ['owner', sql.NVarChar(64), ownerId]
      ]);
      let ord = 0;
      for (const url of items) {
        const fileName = decodeURIComponent(String(url).split('/').pop() || '');
        await exec(tx, `
          INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder)
          VALUES (@id, @kind, @owner, @fn, @url, @ord)`, [
          ['id', sql.NVarChar(64), `${kind}_${ownerId}_${ord}`],
          ['kind', sql.NVarChar(20), kind],
          ['owner', sql.NVarChar(64), ownerId],
          ['fn', sql.NVarChar(500), fileName],
          ['url', sql.NVarChar(1000), url],
          ['ord', sql.Int, ord++]
        ]);
      }
      await incrementVersion(tx);
      return items;
    });
  },

  async deletePhotos(kind, ownerId) {
    return withTransaction(async (tx) => {
      const rows = await queryAll(`
        SELECT Url FROM dbo.Photos WHERE OwnerType = @kind AND OwnerId = @owner
      `.replace('@kind', `'${kind.replace(/'/g, '')}'`).replace('@owner', `'${String(ownerId).replace(/'/g, '')}'`), tx);
      await exec(tx, 'DELETE FROM dbo.Photos WHERE OwnerType = @kind AND OwnerId = @owner', [
        ['kind', sql.NVarChar(20), kind],
        ['owner', sql.NVarChar(64), ownerId]
      ]);
      await incrementVersion(tx);
      return rows.map((r) => r.Url);
    });
  },

  async listAttachments(kind, ownerId) {
    await getPool();
    const rows = await queryAll(`
      SELECT Id, OriginalName, Url, MimeType, SizeBytes
      FROM dbo.Attachments
      WHERE OwnerType = '${kind.replace(/'/g, '')}' AND OwnerId = '${String(ownerId).replace(/'/g, '')}'
      ORDER BY SortOrder`);
    return rows.map((r) => ({
      id: r.Id, name: r.OriginalName, type: r.MimeType || '', size: Number(r.SizeBytes) || 0, url: r.Url, dataUrl: r.Url
    }));
  },

  async replaceAttachments(kind, ownerId, items) {
    return withTransaction(async (tx) => {
      await exec(tx, 'DELETE FROM dbo.Attachments WHERE OwnerType = @kind AND OwnerId = @owner', [
        ['kind', sql.NVarChar(20), kind],
        ['owner', sql.NVarChar(64), ownerId]
      ]);
      let ord = 0;
      for (const item of items) {
        await exec(tx, `
          INSERT INTO dbo.Attachments (Id, OwnerType, OwnerId, OriginalName, FileName, Url, MimeType, SizeBytes, SortOrder)
          VALUES (@id, @kind, @owner, @oname, @fn, @url, @mime, @size, @ord)`, [
          ['id', sql.NVarChar(64), item.id],
          ['kind', sql.NVarChar(20), kind],
          ['owner', sql.NVarChar(64), ownerId],
          ['oname', sql.NVarChar(500), item.name || 'plik'],
          ['fn', sql.NVarChar(500), item.fileName || decodeURIComponent(String(item.url || '').split('/').pop() || '')],
          ['url', sql.NVarChar(1000), item.url],
          ['mime', sql.NVarChar(200), item.type || ''],
          ['size', sql.BigInt, item.size || 0],
          ['ord', sql.Int, ord++]
        ]);
      }
      await incrementVersion(tx);
      return items;
    });
  },

  async deleteAttachments(kind, ownerId) {
    return withTransaction(async (tx) => {
      const rows = await queryAll(`
        SELECT Url FROM dbo.Attachments
        WHERE OwnerType = '${kind.replace(/'/g, '')}' AND OwnerId = '${String(ownerId).replace(/'/g, '')}'
      `, tx);
      await exec(tx, 'DELETE FROM dbo.Attachments WHERE OwnerType = @kind AND OwnerId = @owner', [
        ['kind', sql.NVarChar(20), kind],
        ['owner', sql.NVarChar(64), ownerId]
      ]);
      await incrementVersion(tx);
      return rows.map((r) => r.Url);
    });
  },

  async upsertTable(meta) {
    return withTransaction(async (tx) => {
      await exec(tx, 'DELETE FROM dbo.TechTables WHERE Id = @id', [['id', sql.NVarChar(64), meta.id]]);
      await exec(tx, `
        INSERT INTO dbo.TechTables (Id, GroupId, Name, DateUtc, SourceFileName, DataFileName, SortOrder)
        VALUES (@id, @gid, @name, @date, @src, @data, 0)`, [
        ['id', sql.NVarChar(64), meta.id],
        ['gid', sql.NVarChar(64), meta.groupId],
        ['name', sql.NVarChar(500), meta.name || ''],
        ['date', sql.DateTime2, meta.date ? new Date(meta.date) : null],
        ['src', sql.NVarChar(500), meta.sourceFileName || null],
        ['data', sql.NVarChar(500), meta.dataFileName || (meta.id + '.json')]
      ]);
      await incrementVersion(tx);
      return meta;
    });
  },

  async deleteTable(id) {
    return withTransaction(async (tx) => {
      const rows = await queryAll(`SELECT * FROM dbo.TechTables WHERE Id = '${String(id).replace(/'/g, '')}'`, tx);
      await exec(tx, 'DELETE FROM dbo.TechTables WHERE Id = @id', [['id', sql.NVarChar(64), id]]);
      await incrementVersion(tx);
      return rows[0] || null;
    });
  }
};

module.exports = mssqlStore;
