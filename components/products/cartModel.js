const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cart = new Schema({
    nameId: { type: String},
    products:{
        productId: { type: String},
        imageURL: {type: String},
        price: {type: String},
    },
    slug: { type: String, slug: ["nameId"], unique: true },
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    deleteAt: {type:Date},
    deleted: {type:Boolean},
})
module.exports = mongoose.model('Cart',Cart);