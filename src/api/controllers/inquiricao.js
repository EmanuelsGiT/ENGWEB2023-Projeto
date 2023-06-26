var Inquiricao = require('../models/inquiricao')

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
            .sort({Created:-1})
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
    var d = new Date().toISOString().substring(0,19)
    l.Created = d;
    
    const ScopeContent = l.ScopeContent
    const RelatedMaterial = l.RelatedMaterial

    function extractScope (ScopeContent)  {
        const match = ScopeContent.match(/Filiação:\s(.*?)(?:\s+e|,\w)/);
        if (match) {
            console.log(match[1])
            Inquiricao.find({ScopeContent: { $regex: "Filiação: " + match[1] }}, { _id: 1,  UnitTitle: 1 })
                .then(resposta => {
                    return resposta
                })
                .catch(erro => {
                    return erro
                });
        } else {
            return [];
        }
    };
    
    function extractRelated (RelatedMaterial)  {
        const match = RelatedMaterial.match(/Proc\.(\d+)/g);
        if (match) {
            Inquiricao.find({UnitId: { $regex: match[1] }})
                .then(resposta => {
                    return resposta
                })
                .catch(erro => {
                    return erro
                });
        } else {
            return [];
        }
    };

    function extractNome(Nome) {
        const match = Nome.match(/de genere de\s+(.+?)(?:,|$)/);
        if (match) {
            return match[1];
        } else {
            return "";
        }
    };
        
    const ScopeFiliacao = extractScope(ScopeContent)
    const RelatedFiliacao = extractRelated(RelatedMaterial)
    const Filiacao = ScopeFiliacao.concat(RelatedFiliacao)

    const result = []

    Filiacao.forEach(element => {
       const nome = extractNome (element.UnitTitle)

        const newEntry = {
            Id: element._id,
            Title: nome,
        }

        result.push(newEntry)
    });
        
    l.Filiacao = result

    return Inquiricao.findOne({}, { _id: 1 }, { sort: { _id: -1 } })
        .exec() 
        .then(resu => {
            const newId = parseInt(resu._id) + 1;
            console.log(newId)
            l._id = newId.toString();
            return Inquiricao.create(l);
        })
        .then(resposta => {
        return resposta;
        })
        .catch(erro => {
        return erro;
        });
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
