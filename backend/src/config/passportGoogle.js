const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./database'); // ajusta o caminho conforme seu projeto
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // profile: contém id, displayName, emails, photos...
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    const name = profile.displayName || profile.name?.givenName || 'Usuário Google';

    if (!email) {
      return done(new Error('Google account has no email'), null);
    }

    // Procura usuário na tabela 'users' (crie a tabela se não existir)
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (user) {
      // já existe
      return done(null, user);
    } else {
      // cria novo usuário
      const res = await db.run('INSERT INTO users (name, email, provider, provider_id) VALUES (?,?,?,?)', [
        name, email, 'google', profile.id
      ]);
      const newUser = await db.get('SELECT * FROM users WHERE id = ?', [res.id]);
      return done(null, newUser);
    }
  } catch (err) {
    return done(err);
  }
}));

module.exports = passport;
