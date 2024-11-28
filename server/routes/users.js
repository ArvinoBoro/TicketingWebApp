let express = require('express');
let router = express.Router();
let passport = require('passport');
let User = require('../models/user_model');  // Assuming the user model is in models/user_model.js

// GET Login Page
router.get('/login', (req, res, next) => {
  res.render('auth/login', { title: 'Login' });
});

// POST Login (Authenticate)
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);  // Handle errors
    }
    if (!user) {
      return res.redirect('/users/login');  // Redirect if login fails
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');  // Redirect to home or dashboard after successful login
    });
  })(req, res, next);
});

// GET Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');  // Redirect to home page after logout
  });
});

module.exports = router;
