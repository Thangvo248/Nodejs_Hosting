const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Account = new Schema({
   email: { type: String, default: '' },
   password: { type: String, default: '' },
   loginAt: { type: Date, default: Date.now },
   logoutAt: { type: Date, default: Date.now },
});
Account.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
 });

module.exports = mongoose.model('Account', Account)