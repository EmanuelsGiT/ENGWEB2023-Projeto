var axios = require('axios')


module.exports.list = () => {
    return axios.get('http://localhost:15015/contracts')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
module.exports.getContrato = id => {
    return axios.get('http://localhost:15015/contracts/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
module.exports.getInstituicao = idI => {
    return axios.get('http://localhost:15015/inst/' + idI)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}