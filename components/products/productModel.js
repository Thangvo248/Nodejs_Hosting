const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String},
    description: {type: String},
    detail:{ type: String},
    product_type: {type: String},
    color:{type: String},
    price: {type: Number},
    inventory: {type: String},
    image_url: {type: String},
    slug: { type: String, slug: ["name", "description"]},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    deleteAt: {type:Date},
    deleted: {type:Boolean},
    trademark: {type:String},
})
module.exports = mongoose.model('Product',Product);