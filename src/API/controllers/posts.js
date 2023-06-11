var Post = require('../models/posts')

//.sort({data:-1})
module.exports.getPosts = () => {
    return Post
            .find()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getPostID = id => {
    return Post.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addPost = p => {
    return Post.create(p)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addComent = (id, com) => {
    return Post.updateOne({_id:id}, 
                { $push: { "coments": com } })
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updatePost = p => {
    return Post.updateOne({_id:p._id}, p)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deletePost = id => {
    return Post.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

//module.exports.categorias = () => {
//    return Post.distinct("produtos.categoria")
//            .then(resposta => {
//                return resposta
//            })
//            .catch(erro => {
//                return erro
//            })
//}
//
//module.exports.prodsByCateg = (id) => {
//    return Post.aggregate([{$unwind: "$produtos"}, {$match: {"produtos.categoria": id}}, {$project: {"produtos.designacao":1, _id:0}}])
//            .then(resposta => {
//                return resposta
//            })
//            .catch(erro => {
//                return erro
//            })
//}
//
//module.exports.addProduto = (id, prod) => {
//    return Post.updateOne({_id:id}, 
//                { $push: { "produtos": prod } })
//            .then(resposta => {
//                return resposta
//            })
//            .catch(erro => {
//                return erro
//            })
//}
//
//module.exports.deleteProduto = (id, prod) => {
//    return Post.updateOne({ "_id": id }, 
//                { $pull: {"produtos": {_id: prod}}})
//            .then(resposta => {
//                return resposta
//            })
//            .catch(erro => {
//                return erro
//            })
//}