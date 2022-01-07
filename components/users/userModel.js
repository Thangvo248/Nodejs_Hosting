
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const User = new Schema({
   name: { type: String, default: '' },
   phone: { type: Number, default: '' },
   email: { type: String, default: '' },
   gender: { type: String, default: '' },
   dateofbirth: { type: Date, default: '' },
   profession: { type: String, default: '' },
   address: { type: String, default: '' },
   loginAt: { type: Date, default: Date.now },
   logoutAt: { type: Date, default: Date.now },
   roles: { type: String, default: '' },
   slug: { type: String, slug: ["name","_id"], unique: true },
});
User.plugin(mongooseDelete, {
   deleteAt: true,
   overrideMethods: 'all'
});
module.exports = mongoose.model('User', User)