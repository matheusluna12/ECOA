# ECOEXPLORES - Backend (adaptado)

Projeto backend em Node.js (Express) com SQLite, adaptado para integrar ao frontend do repositório que você indicou.

## Como usar

1. Instale dependências:
```bash
npm install
```

2. Gere dados de exemplo (seed):
```bash
npm run seed
```

3. Rode o servidor:
```bash
npm run dev
# ou
npm start
```

O servidor por padrão roda na porta `4000`. Ajuste no `.env`.

## Rotas principais criadas
- `POST /auth/login` — login (procura em `empresas`, `funcionarios`, `representantes`)
- `POST /auth/refresh` — (não implementado, placeholder)
- `POST /register/:type` — registra `empresas`, `funcionarios`, `representantes`, `filiais`
- `GET /health` — verifica status

## Notas
- Controladores originais que você forneceu foram revisados e adaptados para corrigir problemas comuns (por exemplo, campos de e-mail para JWT).
- Uso de SQLite para simplicidade. Em produção recomendamos migrar para PostgreSQL.
- Seed (`src/seed.js`) cria tabelas básicas e um usuário de exemplo com senha `senha123`.

Coloque o arquivo `cadastro.sqlite` em `database/` (o seed já cria o arquivo e popula os dados).
