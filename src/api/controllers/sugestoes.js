var Sugestao = require('../models/sugestoes')
const mongoose = require('mongoose')

module.exports.getSugestoes = () => {
    return Sugestao
            .find()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getSugestoesPage = pageIndex => {
    return Sugestao
            .find()
            .sort({data:-1})
            .skip((pageIndex-1) * 10)
            .limit(10)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getSugestoesLen = () => {
    return Sugestao
            .find()
            .count()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getSugestaoID = id => {
    return Sugestao.findOne({_id: new mongoose.Types.ObjectId(id)})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addSugestao = p => {
    p._id = new mongoose.Types.ObjectId()
    return Sugestao.create(p)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateSugestao = p => {
    return Sugestao.updateOne({_id:p._id}, p)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteSugestao = id => {
    return Sugestao.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}
//module.exports.getPostPesquisa = (type, searchn, pageIndex) => {
//    if (type == "nome")
//    {
//        const countQuery = Post.find({ nome: { $regex: searchn, $options: 'i' } }).count();
//        const searchQuery = Post
//                            .find({ nome: { $regex: searchn, $options: 'i' } })
//                            .sort({nome:-1})
//                            .skip((pageIndex-1) * 10)
//                            .limit(10);
//        return Promise.all([countQuery, searchQuery])
//                      .then(([count, resposta]) => {
//                            return { list: resposta, len: count };
//                        })
//                        .catch(erro => {
//                          return erro;
//                        });
//    }
//    if (type == "data")
//    {
//        const countQuery = Post.find({ data: { $regex: searchn, $options: 'i' } }).count();
//        const searchQuery = Post
//                            .find({ data: { $regex: searchn, $options: 'i' } })
//                            .sort({data:-1})
//                            .skip((pageIndex-1) * 10)
//                            .limit(10);
//        return Promise.all([countQuery, searchQuery])
//                      .then(([count, resposta]) => {
//                            return { list: resposta, len: count };
//                        })
//                        .catch(erro => {
//                          return erro;
//                        });
//    }
//}



//module.exports.addComment = (id, c) => {
//    return Post.findOne({_id: new mongoose.Types.ObjectId(id)})
//                .then((post) => {
//                if (!post) {
//                    console.log('Post not found');
//                    return;
//                }
//                
//                const newComment = {
//                    _id: new mongoose.Types.ObjectId(),
//                    username: c.nome,
//                    descricao: c.coment 
//                };
//                
//                post.coments.push(newComment);
//            
//                return post.save();
//                })
//                .then(() => {
//                console.log('Comment added successfully');
//                })
//                .catch((err) => {
//                console.error(err);
//                });
//}



//module.exports.deleteComment = (idPost, idComment) => {
//    return Post.updateOne({_id: idPost }, 
//                { $pull: {"coments": {_id: idComment}}})
//            .then(resposta => {
//                return resposta
//            })
//            .catch(erro => {
//                return erro
//            })
//}


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