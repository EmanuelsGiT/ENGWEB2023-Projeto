var express = require('express');
var router = express.Router();
var Lista = require('../controllers/inquiricao')

// GET: os vários pedidos

router.get('/api/inquiricoes', function(req, res, next) {
  Lista.list()
    .then(inquiricoes => {
      res.jsonp(inquiricoes)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das inquiricoes"})
    })
});

router.get('/api/inquiricoes/:id', function(req, res) {
  Lista.getLista(req.params.id)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da inquiricao"})
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

// POST: de uma lista de compras

router.post('/api/inquiricoes', function(req, res) {
  Lista.addLista(req.body)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção da lista"})
    })
})

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

router.delete('/api/inquiricoes/:id/produtos/:prod', function(req, res) {
  Lista.deleteProduto(req.params.id, req.params.prod)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção de um produto"})
    })
})


module.exports = router;
