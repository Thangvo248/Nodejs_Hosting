var express = require('express');
var router = express.Router();
const productController= require('../components/products/productController');
// GET home page. 
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
router.get('/',productController.newproducts)

module.exports = router;