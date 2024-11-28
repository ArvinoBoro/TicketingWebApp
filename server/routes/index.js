let express = require('express');
let router = express.Router();

/* GET landing page. */

router.get('/', (req, res, next) => {
res.locals.displayName = req.user ? req.user.displayName : '';
  res.render('index', { title: 'Home' });
});
/* GET landing page. */
router.get('/home', (req, res, next) => {
  res.render('index', { title: 'Home' });
});
router.get('/add', (req, res, next) => {
res.locals.displayName = req.user ? req.user.displayName : '';
  res.render('tickets/add', { title: 'Add' });
}); 


module.exports = router;
