const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema({
    username: { type: String},
    avatar: { type: String},
    content:{ type: String},
    product:{type: String},
    createAt: {type: Date, default: Date.now},
})
module.exports = mongoose.model('comment',Comment);