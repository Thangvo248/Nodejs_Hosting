const Product = require('./productModel');
const productServices= require('./productServices');
const Comment = require('./commentModel');
const { mongooseToObject } = require('../util/mongooese');
const itemperpage=2;

class ProductDetailController {
    //get products
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
    //post
    async submitComment(req, res, next) {
        try {
            const NewComment = new Comment(req.body);
            const SaveNewComment = await NewComment.save(
                {
                    content: req.body.content,
                    username: usersss.username,
                }
            );
            res.redirect('/products');
        }
        catch (error) {
            next(error);
        }

    }
}
module.exports = new ProductDetailController();