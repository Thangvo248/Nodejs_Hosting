var express = require('express');
var router = express.Router();

const ProductController = require('./productController');
const ProductDetailController = require('./productDetailController');


router.get('/cart', ProductController.cart);

router.get('/productDetail/:slug', ProductDetailController.productDetail);

router.get('/receipt', ProductController.receipt);

router.get('/', ProductController.list);

module.exports = router;