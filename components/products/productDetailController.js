const Product = require('./productModel');
const User = require('../users/userModel');
const productServices = require('./productServices');
const Comment = require('./commentModel');
const { mongooseToObject } = require('../util/mongooese');
const itemperpage = 2;
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');
const Cart = require('./cartModel');
const Receipt = require('./receiptModel');
class ProductDetailController {
    //get products
    async productDetail(req, res, next) {
        const indexcomment = req.query.indexcomment || 1;
        const filter = {};
        filter.slug = req.params.slug;
        const comments = await productServices.list_commnet(filter, indexcomment, itemperpage);

        //get user comments
        await Product.findOne(filter)
            .then(productdetail => {
                res.render('products/productDetail/productDetail', {
                    productdetail: mongooseToObject(productdetail),
                    comments: comments,
                    indexcomment: indexcomment,
                    nextindexcomment: indexcomment + 1
                });
            })
            .catch(next);
    }
    //post
    async submitComment(req, res, next) {
        try {
            const idproduct= req.params._id;

            const id = req.payload.userId;
            const user = await User.findOne({
                _id: id,
            });
            if (!user) {
                throw createError('khong co du lieu');
            }
            const SaveNewComment = new Comment(
                {
                    content: req.body.content,
                    username: user.name,
                    avatar: user.avatar,
                    product: idproduct,
                }
            );
            await SaveNewComment.save();
            res.redirect('/products');
        }
        catch (error) {
            next(error);
        }

    }
}
module.exports = new ProductDetailController();