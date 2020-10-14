const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback',
    passport.authenticate('google', {
        faliureRedirect: '/' // if failed
    }), (req, res) => {
        res.redirect('/dashboard') // if successful
    }
)

// @desc 	Lougout route
// @route 	GET /auth/logout
router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

module.exports = router
