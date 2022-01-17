const Product = require('./productModel');
const Product_Type = require('./productTypeModel');
const { mutipleMongooseToObject } = require('../util/mongooese');
const { mongooseToObject } = require('../util/mongooese');
const productservice= require('./productServices');
const ITEM_PRODUCTS_PER_PAGE=12;

class ProductController {
    //[GET] 

    async list(req, res, next) {
        const page=+req.query.page||1;
        const q= req.query.q;
        const producttype= req.query.producttype;
        const price1=req.query.price1;
        const price2=req.query.price2;
        const trademark=req.query.trademark;
        const filter={};
        const filterproducttype={};
        const sort=req.query.sort||0;
        filter.deleted=false;
        if(trademark)
        filter.trademark=trademark;
        if(price1 && price2)
        filter.price={$gte: price1, $lte: price2};
        else if(price1)
        filter.price={$gte: price1};
        if(q)
        filter.name= RegExp(q,'i');
        if(producttype)
        {
            filter.product_type=producttype;
            filterproducttype.name=producttype;
        }
       
        const totalProduct=await Product.count(filter);
        const product_types=await productservice.list_product_type({});
        const product_type_trade= await productservice.list_product_type(filterproducttype);
        const products = await productservice.list(filter, page-1, ITEM_PRODUCTS_PER_PAGE,sort)
            .then(products => {
                res.render('products/productList', {
                    products: mutipleMongooseToObject(products),
                    hasnextpage: ITEM_PRODUCTS_PER_PAGE*page<totalProduct,
                    haspreviouspage: page>1,
                    nextpage:page+1,
                    previouspage:page-1,
                    ITEM_PRODUCT_PER_PAGE: ITEM_PRODUCTS_PER_PAGE,
                    currentpage:page,
                    lastpage: Math.ceil(totalProduct / ITEM_PRODUCTS_PER_PAGE),
                    q:q,
                    price1:price1,
                    price2:price2,
                    trademark:trademark,
                    product_type:producttype,
                    product_type_trade:product_type_trade,
                    sort: sort>0,
                    sort1:sort<0,
                    product_types: product_types
                });
            })
            .catch(next);
    };
//get 3 product to show panner in hame page
    async newproducts(req,res){
        const filter={};
        const producttypes= await productservice.list_product_type();
        const filterlaptop={};
        filterlaptop.product_type="Máy tính xách tay";
        const sellinglaptop=await productservice.listsellingproduct(filterlaptop,4);
        const filterphone={};
        filterphone.product_type="Điện thoại";
        const sellingphone=await productservice.listsellingproduct(filterphone,4);
        const products= await productservice.listnewproducts(filter,3)
        .then(products => {
            res.render('index',{
                products:mutipleMongooseToObject(products),
                producttypes: producttypes,
                sellinglaptop:sellinglaptop,
                sellingphone:sellingphone
            });
        })
    };
    async cart(req, res) {
        res.render('products/cart');
    };

    //[POST]
    async add(req, res) {

        const result = await cloudinary.uploader.upload(req.file.path);
        try {
            const formData = req.body;
            formData.image_url = result.secure_url;
            const product = new Product(formData);
            const newproduct = await product.save()
            res.redirect('/products')
        } catch {
            res.render('products/addproduct', {
                errorMessage: 'Error creating product'
            })
        }
    };
    //[GET]
    async receipt(req, res) {
        res.render('products/receipt');
    }
}
module.exports = new ProductController();