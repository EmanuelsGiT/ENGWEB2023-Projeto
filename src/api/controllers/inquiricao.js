var Inquiricao = require('../models/inquiricao')

//.sort({data:-1})
module.exports.getInquiricoes = () => {
    return Inquiricao
            .find()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getInquiricoesPage = pageIndex => {
    return Inquiricao
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

module.exports.getInquiricoesLen = () => {
    return Inquiricao
            .find()
            .count()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getInquiricaoID = id => {
    return Inquiricao.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getPesquisa = (type, searchn, pageIndex) => {
    if (type == "nome")
    {
        
        const countQuery = Inquiricao.find({ UnitTitle: { $regex: searchn, $options: 'i' } }).count();
        const searchQuery = Inquiricao
                            .find({ UnitTitle: { $regex: searchn, $options: 'i' } })
                            .sort({UnitTitle:-1})
                            .skip((pageIndex-1) * 10)
                            .limit(10);
        return Promise.all([countQuery, searchQuery])
                      .then(([count, resposta]) => {
                            return { list: resposta, len: count };
                        })
                        .catch(erro => {
                          return erro;
                        });
    }
    if (type == "lugar")
    {
        const countQuery = Inquiricao.find({ ScopeContent: { $regex: searchn, $options: 'i' } }).count();
        const searchQuery = Inquiricao
                            .find({ ScopeContent: { $regex: searchn, $options: 'i' } })
                            .sort({UnitTitle:-1})
                            .skip((pageIndex-1) * 10)
                            .limit(10);
        return Promise.all([countQuery, searchQuery])
                      .then(([count, resposta]) => {
                            return { list: resposta, len: count };
                        })
                        .catch(erro => {
                          return erro;
                        });
    }
    if (type == "data")
    {
        const countQuery = Inquiricao.find({ Created: { $regex: searchn, $options: 'i' } }).count();
        const searchQuery = Inquiricao
                            .find({ Created: { $regex: searchn, $options: 'i' } })
                            .sort({Created:-1})
                            .skip((pageIndex-1) * 10)
                            .limit(10);
        return Promise.all([countQuery, searchQuery])
                      .then(([count, resposta]) => {
                            return { list: resposta, len: count };
                        })
                        .catch(erro => {
                          return erro;
                        });
    }
}

module.exports.addInquiricao = l => {
    return Inquiricao.create(l)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateInquiricao = l => {
    return Inquiricao.updateOne({_id:l._id}, l)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteInquiricao = id => {
    return Inquiricao.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

//module.exports.categorias = () => {
//    return Inquiricao.distinct("produtos.categoria")
//            .then(resposta => {
//                return resposta
//            })
//            .catch(erro => {
//                return erro
//            })
//}
//
//module.exports.prodsByCateg = (id) => {
//    return Inquiricao.aggregate([{$unwind: "$produtos"}, {$match: {"produtos.categoria": id}}, {$project: {"produtos.designacao":1, _id:0}}])
//            .then(resposta => {
//                return resposta
//            })
//            .catch(erro => {
//                return erro
//            })
//}
//
//module.exports.addProduto = (id, prod) => {
//    return Inquiricao.updateOne({_id:id}, 
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
//    return Inquiricao.updateOne({ "_id": id }, 
//                { $pull: {"produtos": {_id: prod}}})
//            .then(resposta => {
//                return resposta
//            })
//            .catch(erro => {
//                return erro
//            })
//}