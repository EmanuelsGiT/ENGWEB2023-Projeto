var express = require('express');
var router = express.Router();
var Inquiricoes = require('../controllers/inquiricao')
var Posts = require('../controllers/posts')

// GET: os vários pedidos
//router.get('/plantas', function(req, res, next) {
//  if(req.query.especie){
//    console.log("especie")
//    Lista.especieEEEE(req.query.especie)
//      .then(plantas=>{
//        res.jsonp(plantas)
//      })
//      .catch(erro=>{
//        res.jsonp({error:erro, message:"Erro na obtencao do contrato"})
//    })
//    
//  } else if(req.query.implant){
//      console.log("implant")
//      Lista.implantAAA(req.query.implant)
//        .then(plantas=>{
//          res.jsonp(plantas)
//        })
//        .catch(erro=>{
//          res.jsonp({error:erro, message:"Erro na obtencao da lista de plantas"})
//      })
//
//  } else {
//    console.log("listaplantas")
//      Lista.list()
//        .then(plantas => {
//          res.json(plantas)
//        })
//        .catch(erro => {
//          res.jsonp({error: erro, message: "Erro na obtenção da lista de plantas"})
//      })
//  }
//});


router.get('/api/inquiricoes', function(req, res, next) {
  Inquiricoes.getInquiricoes()
    .then(inquiricoes => {
      res.jsonp(inquiricoes)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das inquiricoes"})
    })
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

// GET: inquiricao
router.get('/api/inquiricoes/:username', function(req, res) {
  Inquiricoes.getInquiricaoUsername(req.params.username)
    .then(inquiricao => {
      res.jsonp(inquiricao)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da inquiricao"})
    })
});

// POST: de uma lista de compras
router.post('/api/inquiricoes', function(req, res) {
  Inquiricoes.addInquiricao(req.body)
    .then(inquiricao => {
      res.jsonp(inquiricao)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção da inquiricao"})
    })
})

router.get('/api/posts', function(req, res, next) {
  Posts.getPostsPage(parseInt(req.query.page))
    .then(posts => {
      res.jsonp(posts)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção dos posts"})
    })
});

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
