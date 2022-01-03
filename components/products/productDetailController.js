const Product = require('./productModel');
const productServices= require('./productServices');
const { mongooseToObject } = require('../util/mongooese');
const itemperpage=2;

class ProductDetailController {
    async productDetail(req, res, next) {
        const indexcomment=req.query.indexcomment||1;
        const filter={};
        filter.slug=req.params.slug;
        const comments=await productServices.list_commnet(filter,indexcomment,itemperpage);
        await Product.findOne(filter)
            .then(productdetail => {
                res.render('products/productDetail/productDetail', { 
                    productdetail: mongooseToObject(productdetail),
                    comments: comments,
                    indexcomment:indexcomment,
                    nextindexcomment:indexcomment+1
                });
            })
            .catch(next);
    }
}
module.exports = new ProductDetailController();