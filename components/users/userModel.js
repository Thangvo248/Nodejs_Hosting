const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const login = new Schema({
    email: { type: String, default: ''},
    password: { type: String, default: ''},

    loginAt: { type: Date, default: Date.now},
    logoutAt: { type: Date, default: Date.now},
    action: { type: String, default: 'System'},
    
});
 login.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, this.password);


 };
 login.methods.validPassword = function(password){
    return bcrypt.compareSync(password, bcrypt.genSaltSync(5),null);

 };

module.exports = mongoose.model('login', login)