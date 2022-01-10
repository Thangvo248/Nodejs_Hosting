
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');


const User = new Schema({
   name: { type: String, },
   phone: { type: Number, },
   email: { type: String, },
   gender: { type: String, },
   dateofbirth: { type: Date, default: '10/10/2010' },
   profession: { type: String, },
   address: { type: String, },
   loginAt: { type: Date, default: Date.now },
   logoutAt: { type: Date, default: Date.now },
   roles: { type: String, },
});
User.plugin(mongooseDelete, {
   deleteAt: true,
   overrideMethods: 'all'
});
module.exports = mongoose.model('User', User)