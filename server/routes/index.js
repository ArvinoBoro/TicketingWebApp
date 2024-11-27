let express = require('express');
let router = express.Router();

/* GET landing page. */

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});
/* GET landing page. */
router.get('/home', (req, res, next) => {
  res.render('index', { title: 'Home' });
});
router.get('/add', (req, res, next) => {
if(!req.user) {
        res.render('auth/login', {
            title: 'Login',
            message:req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName:''
            });
      } else {
        return res.redirect('tickets/list');
      }
    
}); 


module.exports = router;
