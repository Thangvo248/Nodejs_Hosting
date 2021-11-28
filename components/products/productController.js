

exports.list= async(req,res)=>{
    res.render('products/productList');
}

exports.cart= async(req,res)=>{
    res.render('products/cart');
}

exports.receipt= async(req,res)=>{
    res.render('products/receipt');
}

exports.productDetail= async(req,res)=>{
    res.render('products/productDetail/productDetail');
}