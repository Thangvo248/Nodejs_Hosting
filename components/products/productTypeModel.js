const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product_Type = new Schema({
    name: { type: String},
    trademark: {type: Array},
})
module.exports = mongoose.model('Product_type',Product_Type);