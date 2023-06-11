var express = require('express');
var router = express.Router();
var env = require('../config/env')
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res){
  res.render('index')
})

router.get('/retrieveAll', function(req, res) {
  var data = new Date().toISOString().substring(0,19)
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  
  axios.get(env.apiAccessPoint+"/inquiricoes?token=" + token)
 // axios.get(env.apiAccessPoint+"/inquiricoes")
    .then(response => {
      res.render('inquiricoes', { inquiricoes: response.data, d: data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

router.get('/retrieveList/:id', function(req, res) {
  var data = new Date().toISOString().substring(0,19)
  axios.get(env.apiAccessPoint+"/inquiricoes/" + req.params.id)
    .then(response => {
      res.render('inquiricao', { inquiricao: response.data, d: data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

router.get('/lista/:idLista/deleteProduto/:idProd', function(req, res) {
  var data = new Date().toISOString().substring(0,19)
  console.log(req.params.idProd)
  axios.delete(env.apiAccessPoint+"/listas/"+ req.params.idLista +"/produtos/"+ req.params.idProd)
    .then(response => {
      res.redirect('/retrieveList/' + req.params.idLista)
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

// Tratamento do Login
router.get('/login', function(req, res){
  res.render('login')
})

router.post('/login', function(req, res){
  axios.post('http://localhost:8002/users/login', req.body)
    .then(response => {
      res.cookie('token', response.data.token)
      console.log("Entraste crlh!!!!")
      res.redirect('/retrieveAll')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

// Tratamento do Register
router.get('/register', function(req, res){
  res.render('register')
})

router.post('/register', function(req, res){
  axios.post('http://localhost:8002/users/register', req.body)
    .then(response => {
      //res.cookie('token', response.data.token)
      res.redirect('/')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

// facebook
router.get('/login/facebook', function(req, res){
  axios.get('http://localhost:8002/auth/facebook')
    .then(response => {
      res.cookie('token', response.data.token)
      console.log("Entraste crlh!!!!")
      res.redirect('/retrieveAll')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

// google
router.get('/login/google', function(req, res){
  axios.get('http://localhost:8002/auth/google')
    .then(response => {
      console.log("Entraste crlh!!!!")
      res.redirect('/retrieveAll')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

module.exports = router;
