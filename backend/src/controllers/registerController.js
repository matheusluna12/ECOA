/**
 * Register controller adapted.
 * Reference: uploaded version (if provided) included in /originals if available.
 */

const bcrypt = require('bcrypt');
const db = require('../config/database');

async function handleError(err, res) {
  console.error(err);
  // generic duplicate detection for sqlite (constraint failed)
  if (err && (err.code === 'SQLITE_CONSTRAINT' || (err.message && err.message.includes('UNIQUE')))) {
    return res.status(409).json({ message: 'Registro duplicado' });
  }
  return res.status(500).json({ message: 'Erro interno' });
}

async function register(type, req, res, next) {
  try {
    const payload = req.body || {};
    if (!payload.email || (!payload.password && type !== 'filiais')) {
      return res.status(400).json({ message: 'email e password são obrigatórios no body (password só para entidades que a utilizam)' });
    }
    let passwordHash = null;
    if (payload.password) passwordHash = await bcrypt.hash(payload.password, 10);

    if (type === 'empresas') {
      const sql = `INSERT INTO empresas (name, email, password) VALUES (?,?,?)`;
      const result = await db.run(sql, [payload.name||null, payload.email, passwordHash]);
      return res.status(201).json({ id: result.id });
    }

    if (type === 'funcionarios') {
      const sql = `INSERT INTO funcionarios (name, email, password) VALUES (?,?,?)`;
      const result = await db.run(sql, [payload.name||null, payload.email, passwordHash]);
      return res.status(201).json({ id: result.id });
    }

    if (type === 'representantes') {
      const sql = `INSERT INTO representantes (name, email, password) VALUES (?,?,?)`;
      const result = await db.run(sql, [payload.name||null, payload.email, passwordHash]);
      return res.status(201).json({ id: result.id });
    }

    if (type === 'filiais') {
      const sql = `INSERT INTO filiais (name, email) VALUES (?,?)`;
      const result = await db.run(sql, [payload.name||null, payload.email]);
      return res.status(201).json({ id: result.id });
    }

    return res.status(400).json({ message: 'Tipo inválido' });
  } catch (err) {
    return handleError(err, res);
  }
}

module.exports = { register };
