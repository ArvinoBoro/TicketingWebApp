let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); 
let Ticket = require('../models/user_model');

router.get('/register', (req, res, next) => {
  if(!req.user) {
    res.render('auth/register', {
        title: 'Register',
        message:req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName:''
        });
  } else {
    return res.redirect('/');
  }
});

router.post('/register', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email:req.body.email,
    displayName:req.body.displayName
  });
  User.register(newUser, req.body.password, (err) => {
    if(err) {
      console.log("Error: Inserting the new user");
      if(err.name == "UserExistsError") {
          req.flash('registerMessage', 'Registration Error: User already exists');
      }
      return res.render('auth/register', {
          title:'Register',
          message:req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName:''
        });
    } else {
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/tickets')
      });
    }
  });
});


module.exports = router;
