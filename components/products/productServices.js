const Product = require('./productModel');
const Comment= require('./commentModel');
const Product_Type= require('./productTypeModel');
const { mutipleMongooseToObject } = require('../util/mongooese');
const { mongooseToObject } = require('../util/mongooese');

//select all product in tvtshop
exports.list = async(filter, pageindex, itemperpage) => {
    const products = await Product.find(filter)
    .skip(pageindex*itemperpage)//xoa
    .limit(itemperpage)//3
    return products;
}
// list product tyepe
exports.list_product_type=async()=>{
    const product_types=await Product_Type.find({});
    return product_types;
}
// list comment
exports.list_commnet= async(filter,indexcomment,itemperpage)=>{
    const Comments= await Comment.find(filter)
    .limit(indexcomment*itemperpage);
    return Comments;
}
// list 3 products for home page
exports.listnewproducts= async(filter)=>{
    const products= await Product.find(filter)
    .limit(3);
    return products;
}