require('dotenv').config();
const bcrypt = require('bcrypt');
const { run } = require('./config/database');

async function seed() {
  try {
    // create tables
    await run(`CREATE TABLE IF NOT EXISTS empresas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );`);
    await run(`CREATE TABLE IF NOT EXISTS funcionarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );`);
    await run(`CREATE TABLE IF NOT EXISTS representantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );`);
    await run(`CREATE TABLE IF NOT EXISTS filiais (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    );`);

    // insert sample users (senha: senha123)
    const password = await bcrypt.hash('senha123', 10);
    await run('INSERT OR IGNORE INTO empresas (id,name,email,password) VALUES (1,?,?,?);', ['Empresa Exemplo','empresa@exemplo.com', password]);
    await run('INSERT OR IGNORE INTO funcionarios (id,name,email,password) VALUES (1,?,?,?);', ['Funcionario Exemplo','func@exemplo.com', password]);
    await run('INSERT OR IGNORE INTO representantes (id,name,email,password) VALUES (1,?,?,?);', ['Representante Exemplo','rep@exemplo.com', password]);

    console.log('Seed concluído. Usuários de exemplo: empresa@exemplo.com / senha123');
  } catch (err) {
    console.error('Erro no seed:', err);
  }

await run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  provider TEXT,
  provider_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`);

}



seed();
