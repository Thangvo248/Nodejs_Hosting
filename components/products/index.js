var express = require('express');
var router = express.Router();

const ProductController = require('./productController');



router.get('/cart', ProductController.cart);

router.get('/productDetail', ProductController.productDetail);

router.get('/receipt', ProductController.receipt);

router.get('/', ProductController.list);
module.exports = router;