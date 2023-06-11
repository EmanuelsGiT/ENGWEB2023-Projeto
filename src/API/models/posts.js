const mongoose = require('mongoose')

var comentSchema = new mongoose.Schema({
    _id: String,
    username: String,
    descricao: String
});

var postSchema = new mongoose.Schema({
    _id: String,
    designacao: String,
    data: String,
    registo: String,
    coments: [comentSchema]
});

module.exports = mongoose.model('post', postSchema)