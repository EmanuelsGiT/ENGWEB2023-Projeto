const mongoose = require('mongoose')


var postSchema = new mongoose.Schema({
    _id: String,
    
});


var postsSchema = new mongoose.Schema({

});

module.exports = mongoose.model('posts', postsSchema)