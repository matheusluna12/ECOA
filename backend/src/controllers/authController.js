/**
 * Auth controller adapted and fixed.
 * Reference: uploaded version (if provided) included in /originals if available.
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/database');

const TABLES = [
  { table: 'empresas', idCol: 'id', emailCol: 'email', passCol: 'password', type: 'empresa' },
  { table: 'funcionarios', idCol: 'id', emailCol: 'email', passCol: 'password', type: 'funcionario' },
  { table: 'representantes', idCol: 'id', emailCol: 'email', passCol: 'password', type: 'representante' }
];

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email e password são obrigatórios' });

    // search user across tables
    for (const t of TABLES) {
      const sql = `SELECT * FROM ${t.table} WHERE ${t.emailCol} = ? LIMIT 1`;
      const user = await db.get(sql, [email]);
      if (user) {
        // compare password
        const hashed = user[t.passCol];
        const match = await bcrypt.compare(password, hashed);
        if (!match) return res.status(401).json({ message: 'Credenciais inválidas' });

        const payload = {
          id: user[t.idCol],
          email: user[t.emailCol] || email,
          type: t.type
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'troque_esta_chave', { expiresIn: '8h' });
        return res.json({ token, user: payload });
      }
    }

    return res.status(404).json({ message: 'Usuário não encontrado' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no login' });
  }
}

module.exports = { login };
