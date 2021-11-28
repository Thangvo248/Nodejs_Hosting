const Product = require('../products/productService');
const { mutipleMongooseToObject } = require('../util/mongooese');

exports.list= async(req,res)=>{

    Product.find({})
        .then(products=> {
            res.render('products/productList',{ products: mutipleMongooseToObject(products) 
            });
        })
        .catch(next);
    //res.render('products/productList');
}

exports.cart= async(req,res)=>{
    res.render('products/cart');
}

exports.receipt= async(req,res)=>{
    res.render('products/receipt');
}

exports.productDetail= async(req,res)=>{
    res.render('products/productDetail/productDetail');
}