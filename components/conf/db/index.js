const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/ptudweb_ecommerce_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true

        });
        console.log('thanhcong');
    } catch (error) {

    }
}

module.exports={connect};