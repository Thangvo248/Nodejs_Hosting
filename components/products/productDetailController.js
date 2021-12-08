const Product = require('./productModel');
const { mongooseToObject } = require('../util/mongooese');

class ProductDetailController {
    async productDetail(req, res, next) {
        await Product.findOne({ slug: req.params.slug })
            .then(productdetail => {
                res.render('products/productDetail/productDetail', { productdetail: mongooseToObject(productdetail) });
            })
            .catch(next);
    }
}
module.exports = new ProductDetailController();