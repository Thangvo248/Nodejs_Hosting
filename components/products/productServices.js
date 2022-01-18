const Product = require('./productModel');
const Comment= require('./commentModel');
const Product_Type= require('./productTypeModel');
const { mutipleMongooseToObject } = require('../util/mongooese');
const { mongooseToObject } = require('../util/mongooese');

//select all product in tvtshop
exports.list = async(filter, pageindex, itemperpage,sort) => {
    const products = await Product.find(filter)
    .skip(pageindex*itemperpage)
    .limit(itemperpage)
    .sort({price:sort});
    return products;
}
// list product tyepe
exports.list_product_type=async()=>{
    const product_types=await Product_Type.find({});
    return product_types;
}
// list comment
exports.list_commnet= async(filter,indexcomment,itemperpage)=>{
    const product= await Product.findOne({
        slug: filter.slug,
    })
    const Comments= await Comment.find({
        product: product._id,
    })
    .limit(indexcomment*itemperpage);
    return Comments;
}
// list 3 products for home page
exports.listnewproducts= async(filter,lm)=>{
    const products= await Product.find(filter)
    .limit(lm);
    return products;
}
exports.listsellingproduct= async(filter, top)=>{
    const products= await Product.find(filter)
    .sort({sold:-1})
    .limit(top);
    return products;
}
