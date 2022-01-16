var express = require('express');
const productController = require('./productController');
var router = express.Router();

const ProductController = require('./productController');
const ProductDetailController = require('./productDetailController');
const CartController = require('./cartController');

//middlewares
const {  verifyAccessToken } = require('../../middlewares/authJwt');

router.get('/cart', verifyAccessToken, CartController.cart);

router.get('/productDetail/:slug', ProductDetailController.productDetail);

router.get('/receipt', ProductController.receipt);

router.get('/', ProductController.list);

router.post('/submitComment', ProductDetailController.submitComment);

module.exports = router;