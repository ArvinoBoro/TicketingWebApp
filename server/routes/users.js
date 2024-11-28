
      req.flash('loginMessage',
        'AuthenticationError');
         return res.redirect('/users/login');  // Redirect if login fails
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/tickets');  // Redirect to home or dashboard after successful login
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


router.get('/register', (req, res, next) => {
  if(!req.user) {
    res.render('auth/register', {
        title: 'Register',
        message: req.flash('registerMessage'),
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
