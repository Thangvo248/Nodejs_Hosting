const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema({
    username: { type: String},
    avatar: {type: String},
    content:{ type: String},
    rating_star: {type: Number},
    product:{type: String},
})
module.exports = mongoose.model('comment',Comment);