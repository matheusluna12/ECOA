const express = require('express')
const router = express.Router()
const passport = require('passport')
const { login } = require('../controllers/authController')

router.post('/login', login)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect(process.env.FRONTEND_URL)
})

module.exports = router
