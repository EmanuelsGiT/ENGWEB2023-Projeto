const mongoose = require('mongoose')

var sugestaoSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    nomeUser: String,
    descricao: String,
    data: String,
    registo: String,
});

module.exports = mongoose.model('sugestao', sugestaoSchema)