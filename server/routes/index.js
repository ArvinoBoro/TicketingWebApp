let express = require('express');
let router = express.Router();

/* GET landing page. */

router.get('/', (req, res, next) => {
  displayName = req.user ? req.user.displayName : '';
  res.render('index', { title: 'Home' });
});
/* GET landing page. */
router.get('/home', (req, res, next) => {
  displayName = req.user ? req.user.displayName : '';
  res.render('index', { title: 'Home' });
});

router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Contact Us'});
});


module.exports = router;
