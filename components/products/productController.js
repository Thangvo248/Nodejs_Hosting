const Product = require('./productModel');
const { mutipleMongooseToObject } = require('../util/mongooese');
const { mongooseToObject } = require('../util/mongooese');
const productservice= require('./productServices');
const ITEM_PRODUCTS_PER_PAGE=8;

class ProductController {
    //[GET] 

    async list(req, res, next) {
        const page=+req.query.page||1;
        const q= req.query.q;
        const filter={};
        if(q)
        filter.name= RegExp(q,'i');
        const totalProduct=await Product.count(filter);
        const products = await productservice.list(filter, page-1, ITEM_PRODUCTS_PER_PAGE)
            .then(products => {
                res.render('products/productList', {
                    products: mutipleMongooseToObject(products),
                    hasnextpage: ITEM_PRODUCTS_PER_PAGE*page<totalProduct,
                    haspreviouspage: page>1,
                    nextpage:page+1,
                    previouspage:page-1,
                    ITEM_PRODUCT_PER_PAGE: ITEM_PRODUCTS_PER_PAGE,
                    currentpage:page,
                    lastpage: Math.ceil(totalProduct / ITEM_PRODUCTS_PER_PAGE),
                    q:q,
                });
            })
            .catch(next);
    };
    //[GET] 

    async cart(req, res) {
        res.render('products/cart');
    };
    //[POST]
    async add(req, res) {

        const result = await cloudinary.uploader.upload(req.file.path);
        try {
            const formData = req.body;
            formData.image_url = result.secure_url;
            const product = new Product(formData);
            const newproduct = await product.save()
            res.redirect('/products')
        } catch {
            res.render('products/addproduct', {
                errorMessage: 'Error creating product'
            })
        }
    };
    //[GET]
    async receipt(req, res) {
        res.render('products/receipt');
    }
}
module.exports = new ProductController();