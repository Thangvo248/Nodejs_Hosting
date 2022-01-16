const Product = require('./productModel');
const Product_Type = require('./productTypeModel');
const { mutipleMongooseToObject } = require('../util/mongooese');
const { mongooseToObject } = require('../util/mongooese');
const productservice= require('./productServices');
const ITEM_PRODUCTS_PER_PAGE=8;

class CartController {
    async cart(req, res) {
        
        res.render('products/cart');
    };
}

module.exports = new CartController();