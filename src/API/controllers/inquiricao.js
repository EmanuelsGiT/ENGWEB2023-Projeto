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
        return Inquiricao
            .find({UnitTitle: {$regex: searchn, $options:'i'}})
            .sort({UnitTitle:-1})
            .skip((pageIndex-1) * 10)
            .limit(10)
            .then(resposta => {
                return {list: resposta, len: resposta.length}
            })
            .catch(erro => {
                return erro
            })
    }
    if (type == "lugar")
    {
        return Inquiricao
            .find({ScopeContent: {$regex: searchn, $options:'i'}})
            .sort({UnitTitle:-1})
            .skip((pageIndex-1) * 10)
            .limit(10)
            .then(resposta => {
                return (resposta, resposta.length)
            })
            .catch(erro => {
                return erro
            })
    }
    if (type == "data")
    {
        return Inquiricao
            .find({Created: {$regex: searchn, $options:'i'}})
            .sort({UnitTitle:-1})
            .skip((pageIndex-1) * 10)
            .limit(10)
            .then(resposta => {
                return (resposta, resposta.length)
            })
            .catch(erro => {
                return erro
            })
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