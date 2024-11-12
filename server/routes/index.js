let express = require('express');
let router = express.Router();

/* GET landing page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET landing page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
router.get('/tickets', function(req, res, next) {
  res.render('tickets/list', { title: 'List' });
});
router.get('/add', function(req, res, next) {
  res.render('tickets/add', { title: 'Add' });
});

module.exports = router;

