var axios = require('axios')
var env = require('../config/env')

module.exports.login = body => {
    return axios.post('http://localhost:8002/users/login', body)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })  
}

module.exports.getUsers = token => {
    return axios.get('http://localhost:8002/users/' + "?token=" + token)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getCurrentUser = token => {
    return axios.get('http://localhost:8002/users/profile' + "?token=" + token)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addUser = body => {
    return axios.post('http://localhost:8002/users/register', body)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteUser = (id, token) => {
    return axios.delete('http://localhost:8002/users/' + id + "?token=" + token)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}


module.exports.getInquiricoesPage = (page, token) => {
    return axios.get(env.apiAccessPoint+"/inquiricoes?page="+ page +"&token=" + token)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getInquiricoesSearchPage = (searchType, search, page, token) => {
    return axios.get(env.apiAccessPoint+"/inquiricoes?searchType=" + searchType + "&search=" + search + "&page="+ page +"&token=" + token)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.newInquiricao = (body, token) => {
    return axios.post(env.apiAccessPoint+"/inquiricoes/" + "?token=" + token, body)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })   
}

module.exports.getInquiricao = (id, token) => {
    return axios.get(env.apiAccessPoint+"/inquiricoes/" + id +"?token=" + token)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })  
}

module.exports.deleteInquiricao = (id, token) => {
    return axios.delete(env.apiAccessPoint + "/inquiricoes/" + id + "?token=" + token)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })  
}

module.exports.getPostsPage = (page, token) => {
    return axios.get(env.apiAccessPoint+"/posts?page=" + page + "&token=" + token)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })     
}

module.exports.getPostsSearchPage = (searchType, search, page, token) => {
    return axios.get(env.apiAccessPoint+"/posts?searchType=" + searchType + "&search=" + search + "&page="+ page +"&token=" + token)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })     
}

module.exports.newPost = (token, body) => {
    return axios.post(env.apiAccessPoint + "/posts/" + "?token=" + token, body)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })   
}

module.exports.getPost = (id, token) => {
    return axios.get(env.apiAccessPoint + "/posts/" + id + "?token=" + token)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })   
}

module.exports.deletePost = (id, token) => {
    return axios.delete(env.apiAccessPoint + "/posts/" + id + "?token=" + token)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })   
}

module.exports.newPostComment = (id, token, body) => {
    return axios.post(env.apiAccessPoint+"/posts/" + id + "?token=" + token, body)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })    
}

module.exports.deletePostComment = (idP, idC, token) => {
    return axios.delete(env.apiAccessPoint + "/posts/" + idP + "/comments/" + idC + "?token=" + token)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })    
}