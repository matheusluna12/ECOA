require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')

require('./config/passport')

const authRoutes = require('./routes/auth')
const registerRoutes = require('./routes/register')
const { errorHandler } = require('./middleware/errorHandler')

const app = express()
const PORT = process.env.PORT || 4000
const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:3000'

app.use(cors({ origin: FRONTEND, credentials: true }))
app.use(express.json())

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)
app.use('/register', registerRoutes)

app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Servidor</title>
        <style>
          html, body {
            height: 100%;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
            background: #f7f7f7;
          }
          .center {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #222;
          }
          .card {
            background: #fff;
            padding: 28px 36px;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            text-align: center;
          }
          .status {
            font-size: 18px;
            margin-top: 8px;
            color: #4a5568;
          }
        </style>
      </head>
      <body>
        <div class="center">
          <div class="card">
            <h1>Servidor rodando</h1>
            <p class="status">Porta: ${PORT} — rota /health disponível (JSON)</p>
          </div>
        </div>
      </body>
    </html>
  `)
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
