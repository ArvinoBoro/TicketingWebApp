let express = require('express');
let router = express.Router();

/* GET landing page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

