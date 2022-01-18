const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Receipt = new Schema({
    nameId: { type: String},
    products:{
        productId: { type: String},
        quantily: {type: String},
        imageURL: {type: String},
        price: {type: String},
    },
    total: {type: String},
    slug: { type: String, slug: ["nameId"]},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    deleteAt: {type:Date},
    deleted: {type:Boolean},
})
module.exports = mongoose.model('Receipt',Receipt);