var express = require('express');
var router = express.Router();

/* GET shop page. */
router.get('/', function(req, res, next) {
  res.render('products/productDetail/productDetail', { title: 'Express' });
});

module.exports = router;
