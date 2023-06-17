var express = require('express');
var router = express.Router();
var Inquiricoes = require('../controllers/inquiricao')
var Posts = require('../controllers/posts')

// GET: os vários pedidos Inquiricoes
router.get('/api/inquiricoes', function(req, res, next) {
  if(req.query.searchType && req.query.search){
    console.log("pesquisaInquiricao")
    Inquiricoes.getPesquisa(req.query.searchType, req.query.search, parseInt(req.query.page)) 
      .then(response=>{
        console.log(response.len)
        const numPages_ = Math.ceil(response.len / 10);
        res.jsonp({ inquiricoes: response.list, numPages: numPages_ })
      })
      .catch(erro=>{
        res.jsonp({error:erro, message:"Erro na obtencao do contrato"})
    })
  } else {
    Inquiricoes.getInquiricoesPage(parseInt(req.query.page))
    .then(response => {
      Inquiricoes.getInquiricoesLen()
        .then(len => {
          const numPages_ = Math.ceil(len / 10);
          res.jsonp({ inquiricoes: response, numPages: numPages_ })
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro na obtenção da len das inquiricoes"})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das inquiricoes"})
    })
  }
});

// GET: inquiricao
router.get('/api/inquiricoes/:id', function(req, res) {
  Inquiricoes.getInquiricaoID(req.params.id)
    .then(inquiricao => {
      res.jsonp(inquiricao)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da inquiricao"})
    })
});

// POST: de uma inquiricao
router.post('/api/inquiricoes', function(req, res) {
  Inquiricoes.addInquiricao(req.body)
    .then(inquiricao => {
      res.jsonp(inquiricao)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção da inquiricao"})
    })
})

// POST : de um comentario
router.post('/api/posts/:id', function(req, res) {
  Posts.addComment(req.params.id, req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no comment"})
    })

})

// GET: os vários pedidos Inquiricoes
router.get('/api/posts', function(req, res, next) {
  if(req.query.searchType && req.query.search){
    console.log("pesquisaPost")
    Posts.getPostPesquisa(req.query.searchType, req.query.search, parseInt(req.query.page)) 
      .then(response=>{
        console.log(response.len)
        const numPages_ = Math.ceil(response.len / 10);
        res.jsonp({ posts: response.list, numPages: numPages_ })
      })
      .catch(erro=>{
        res.jsonp({error:erro, message:"Erro na obtencao do contrato"})
    })
  } else {
    Posts.getPostsPage(parseInt(req.query.page))
      .then(posts_ => {
        Posts.getPostsLen()
          .then(len => {
            const numPages_ = Math.ceil(len / 10);
            res.jsonp({ posts: posts_, numPages: numPages_ })
          })
          .catch(erro => {
            res.render('error', {error: erro, message: "Erro na obtenção da len dos posts"})
          })
      })
      .catch(erro => {
        res.render('error', {error: erro, message: "Erro na obtenção dos posts"})
      })
  }
});

router.get('/api/posts/:id', function(req, res) {
  Posts.getPostID(req.params.id)
    .then(post => {
      res.jsonp(post)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do post"})
    })
});

router.post('/api/posts/', function(req, res) { // ver rota
  Posts.addPost(req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})


// GET: inquiricao
//router.get('/api/inquiricoes/:username', function(req, res) {
//  Inquiricoes.getInquiricaoUsername(req.params.username)
//    .then(inquiricao => {
//      res.jsonp(inquiricao)
//    })
//    .catch(erro => {
//      res.render('error', {error: erro, message: "Erro na obtenção da inquiricao"})
//    })
//});
//router.get('/api/inquiricoes', function(req, res, next) {
//  Inquiricoes.getInquiricoes()
//    .then(inquiricoes => {
//      res.jsonp(inquiricoes)
//    })
//    .catch(erro => {
//      res.render('error', {error: erro, message: "Erro na obtenção das inquiricoes"})
//    })
//});

//router.get('/api/inquiricoes', function(req, res, next) {
//  Inquiricoes.getInquiricoesPage(parseInt(req.query.page))
//    .then(response => {
//      Inquiricoes.getInquiricoesLen()
//        .then(len => {
//          const numPages_ = Math.ceil(len / 10);
//          res.jsonp({ inquiricoes: response, numPages: numPages_ })
//        })
//        .catch(erro => {
//          res.render('error', {error: erro, message: "Erro na obtenção da len das inquiricoes"})
//        })
//    })
//    .catch(erro => {
//      res.render('error', {error: erro, message: "Erro na obtenção das inquiricoes"})
//    })
//});
//
//router.get('/api/categorias', function(req, res) {
//  Lista.categorias()
//    .then(lista => {
//      res.jsonp(lista)
//    })
//    .catch(erro => {
//      res.render('error', {error: erro, message: "Erro na obtenção das categorias"})
//    })
//});

//router.get('/api/categorias/:id/produtos', function(req, res) {
//  Lista.prodsByCateg(req.params.id)
//    .then(lista => {
//      res.jsonp(lista)
//    })
//    .catch(erro => {
//      res.render('error', {error: erro, message: "Erro na obtenção das categorias"})
//    })
//});

// POST: de um produto numa lista de compras

//router.post('/api/inquiricoes/:id/produtos', function(req, res) {
//  Lista.addProduto(req.params.id, req.body)
//    .then(dados => {
//      res.jsonp(dados)
//    })
//    .catch(erro => {
//      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
//    })
//})

// DELETE de um produto numa lista de compras

//router.delete('/api/inquiricoes/:id/produtos/:prod', function(req, res) {
//  Lista.deleteProduto(req.params.id, req.params.prod)
//    .then(dados => {
//      res.jsonp(dados)
//    })
//    .catch(erro => {
//      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
//    })
//})


module.exports = router;
