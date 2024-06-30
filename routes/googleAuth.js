const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate OAuth with Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/users/login', failureFlash: true }),
  (req, res) => {
    // Successful authentication, redirect home.
    let user = req.user;
    req.flash('success', `@${req.user.username}, successfully logged in with Google`);
    res.redirect('/explore');
  });

module.exports = router;
