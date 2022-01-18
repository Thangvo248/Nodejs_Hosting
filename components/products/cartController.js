const Product = require('./productModel');
const Product_Type = require('./productTypeModel');
const { mutipleMongooseToObject } = require('../util/mongooese');
const { mongooseToObject } = require('../util/mongooese');
const productservice = require('./productServices');
const ITEM_PRODUCTS_PER_PAGE = 8;
const User = require('../users/userModel');
const Cart = require('./cartModel');
class CartController {
    async cart(req, res, next) {
        /*try {
            const id = req.payload.userId;
            const cart = await Cart.findOne({
                nameId: id,
            })
            
            res.json(cart.map(cart => cart.toObject()));
            const products = await Cart.find(cart.products.productId)
            res.send(products);
            res.render('products/productDetail/cart', {
                cart: mutipleMongooseToObject(cart),
            });
        }
        catch (error) {
            next(error);
        }*/
        res.render('products/cart');
    };
    async submitcart(req, res, next) {
        try {
            const idproduct = req.params._id;
            const id = req.payload.userId;
            const user = await User.findOne({
                _id: id,
            });
            const product = await Product.findOne({
                _id: idproduct,
            })
            if (!user || !product) {
                throw createError('khong co du lieu');
            }
            const Savenewcart = new Cart(
                {
                    nameId: user._id,
                    products: {
                        productId: product._id,
                        imageURL: product.image_url,
                        price: product.price,
                    }
                }
            );
            await Savenewcart.save();
            res.redirect('/products/productDetail/' + product.slug);
        }
        catch (error) {
            next(error);
        }
    };
}

module.exports = new CartController();