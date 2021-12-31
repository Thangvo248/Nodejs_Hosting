const Product = require('./productModel');
const { mutipleMongooseToObject } = require('../util/mongooese');
const { mongooseToObject } = require('../util/mongooese');

//select all product in tvtshop
exports.list = async(filter, pageindex, itemperpage) => {
    const products = await Product.find(filter)
    .skip(pageindex*itemperpage)
    .limit(itemperpage)
    return products;
}
