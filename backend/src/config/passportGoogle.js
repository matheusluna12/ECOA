const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const db = require('./database')
const jwt = require('jsonwebtoken')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails && profile.emails[0] && profile.emails[0].value
    const name = profile.displayName || profile.name?.givenName || 'Usuário Google'

    if (!email) {
      return done(new Error('Google account has no email'), null)
    }

    const user = await db.get('SELECT * FROM users WHERE email = ?', [email])

    if (user) {
      return done(null, user)
    } else {
      const res = await db.run('INSERT INTO users (name, email, provider, provider_id) VALUES (?,?,?,?)', [
        name, email, 'google', profile.id
      ])
      const newUser = await db.get('SELECT * FROM users WHERE id = ?', [res.id])
      return done(null, newUser)
    }
  } catch (err) {
    return done(err)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.get('SELECT * FROM users WHERE id = ?', [id])
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

module.exports = passport
