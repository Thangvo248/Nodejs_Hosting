const Product = require('./productModel');
const { mutipleMongooseToObject } = require('../util/mongooese');
const { mongooseToObject } = require('../util/mongooese');

class ProductController {
    //[GET] 

    async list(req, res, next) {
        const products = await Product.find({ deletedAt: null})
            .then(products => {
                res.render('products/productList', {
                    products: mutipleMongooseToObject(products)
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
    //Tho



    
    //Vi
}
module.exports = new ProductController();