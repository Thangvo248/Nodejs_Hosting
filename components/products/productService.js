const {models} =require('../models');

exports.List = ()=>{
    return models.product.finAll();
};