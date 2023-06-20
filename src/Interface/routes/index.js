var express = require('express');
var router = express.Router();
var Controller = require('../controllers/controllers');
const { response } = require('../../API/app');


/* GET home page. */
router.get('/', function(req, res){
  res.render('login')
})

router.get('/home/inquiricoes', function(req, res) {
  var data = new Date().toISOString().substring(0,19)
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  
  const page = req.query.page
  if (page <= 0) res.render('error', {error: err})
  const currentPage = parseInt(page) || 1;
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  
  
  if(req.query.searchType && req.query.search) {
    Controller.getInquiricoesSearchPage(req.query.searchType, req.query.search, page, token)
      .then(response => {
        Controller.getCurrentUser(token)
          .then(response2 => {
            if (currentPage > response.numPages) res.render('error', {error: err})
            const nextPage = currentPage < response.numPages ? currentPage + 1 : currentPage;
            res.render('inquiricoesUser', { inquiricoes: response.inquiricoes, 
                                            prevIndex: prevPage, 
                                            nextIndex: nextPage,
                                            searcht: req.query.searchType,
                                            search: req.query.search,
                                            user: response2.dados });
          })
          .catch(err => {
            res.render('error', {error: err})
          })
      })
      .catch(err => {
        res.render('error', {error: err})
      })
  } else {
    Controller.getInquiricoesPage(page, token)
      .then(response => {
        Controller.getCurrentUser(token)
          .then(response2 => {
            if (currentPage > response.numPages) res.render('error', {error: err})
            const nextPage = currentPage < response.numPages ? currentPage + 1 : currentPage;
            res.render('inquiricoesUser', { inquiricoes: response.inquiricoes, 
                                            prevIndex: prevPage, 
                                            nextIndex: nextPage,
                                            user: response2.dados });
          })
          .catch(err => {
            res.render('error', {error: err})
          })

      })
      .catch(err => {
        res.render('error', {error: err})
      })   
  }
});

router.route('/home/inquiricoes/newInquiricao').get(function(req, res) {
  res.render('newInquiricao')
}).post(function(req, res) {
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  Controller.newInquiricao(token, req.body)
  .then(response => {
    res.redirect('/home/inquiricoes')
  })
  .catch(err => {
    res.render('error', {error: err})
  })
})

router.get('/home/inquiricao/:id', function(req, res) {
  var data = new Date().toISOString().substring(0,19)
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  Controller.getInquiricao(req.params.id, token)
    .then(response => {
      Controller.getCurrentUser(token)
        .then(response2 => {
          res.render('inquiricao', { inquiricao: response, user: response2.dados, d: data });
        })
        .catch(err => {
          res.render('error', {error: err})
        })
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});


router.get('/home/inquiricao/delete/:id', function(req,res) {
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  Controller.deleteInquiricao(req.params.id, token)
    .then(response => {
      res.redirect('/home/inquiricoes');
    })
    .catch(err => {
      res.render('error', {error: err})
    })
})


router.get('/home/perfil', function(req, res) {
  var data = new Date().toISOString().substring(0,19)
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  Controller.getCurrentUser(token)
    .then(response => {
      res.render('perfil', { user: response.dados, d: data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

router.get('/home', function(req, res) {
  var data = new Date().toISOString().substring(0,19)
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token

  const page = req.query.page
  if (page <= 0) res.render('error', {error: err})
  const currentPage = parseInt(page) || 1;
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  
  if(req.query.searchType && req.query.search) {
    Controller.getPostsSearchPage(req.query.searchType, req.query.search, page, token)
      .then(response => {
        if (currentPage > response.numPages) res.render('error', {error: err})
        console.log(response.numPages)
        const nextPage = currentPage < response.numPages ? currentPage + 1 : currentPage;
        res.render('homeUser', { posts: response.posts, 
                                        prevIndex: prevPage, 
                                        nextIndex: nextPage,
                                        searcht: req.query.searchType,
                                        search: req.query.search });
      })
      .catch(err => {
        res.render('error', {error: err})
      })
  } else {
    Controller.getPostsPage(page, token)
      .then(response => {
        if (currentPage > response.numPages) res.render('error', {error: err})
        const nextPage = currentPage < response.numPages ? currentPage + 1 : currentPage;
        res.render('homeUser', { posts: response.posts, 
                                  prevIndex: prevPage, 
                                  nextIndex: nextPage });
      })
      .catch(err => {
        res.render('error', {error: err})
      })
  }
});

router.get('/home/post/:idPost/delete/:idComment', function(req, res) {
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  Controller.deletePostComment(req.params.idPost, req.params.idComment, token)
    .then(response => {
      res.redirect('/home/post/' + req.params.idPost)
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});


router.get('/home/post/delete/:id', function(req,res) {
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  Controller.deletePost(req.params.id, token)
    .then(response => {
      res.redirect('/home');
    })
    .catch(err => {
      res.render('error', {error: err})
    })
})

router.route('/home/post/:id').get(function(req, res) {
  var data = new Date().toISOString().substring(0,19)
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  Controller.getPost(req.params.id, token)
    .then(response => {
      Controller.getCurrentUser(token)
        .then(response2 => {
          res.render('post', { post: response, user: response2.dados, d: data });
        })
        .catch(err => {
          res.render('error', {error: err})
        })
    })
    .catch(err => {
      res.render('error', {error: err})
    })
}).post(function(req, res) {
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  Controller.newPostComment(req.params.id, token, req.body)
  .then(response => {
    res.redirect('/home/post/' + req.params.id)
  })
  .catch(err => {
    res.render('error', {error: err})
  })
})

router.route('/home/inquiricao/:id/newpost').get(function(req,res) {
  var date = new Date().toISOString().substring(0,19)
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  Controller.getInquiricao(req.params.id, token)
    .then(response => {
      Controller.getCurrentUser(token)
        .then(response2 => {
          res.render('newPost', {inq: response, d:date, user: response2.dados});
        })
        .catch(err => {
          res.render('error', {error: err})
        })
    })
    .catch(err => {
      res.render('error', {error: err})
    })
  }).post(function(req, res) {
  var token = ""
  if(req.cookies && req.cookies.token)
    token = req.cookies.token
  Controller.newPost(token, req.body)
  .then(response => {
    res.redirect('/home/inquiricao/' + req.params.id)
  })
  .catch(err => {
    res.render('error', {error: err})
  })
})

//router.get('/retrieveList/:id', function(req, res) {
//  var data = new Date().toISOString().substring(0,19)
//  axios.get(env.apiAccessPoint+"/inquiricoes/" + req.params.id)
//    .then(response => {
//      res.render('inquiricao', { inquiricao: response, d: data });
//    })
//    .catch(err => {
//      res.render('error', {error: err})
//    })
//});
//
//router.get('/lista/:idLista/deleteProduto/:idProd', function(req, res) {
//  var data = new Date().toISOString().substring(0,19)
//  console.log(req.params.idProd)
//  axios.delete(env.apiAccessPoint+"/listas/"+ req.params.idLista +"/produtos/"+ req.params.idProd)
//    .then(response => {
//      res.redirect('/retrieveList/' + req.params.idLista)
//    })
//    .catch(err => {
//      res.render('error', {error: err})
//    })
//});

// Tratamento do Login
router.get('/login', function(req, res){
  res.render('login')
})

router.post('/login', function(req, res){
  Controller.login(req.body)
    .then(response => {
      console.log(response)
      res.cookie('token', response.token)
      console.log("Entraste crlh!!!!")
      res.redirect('/home')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

// Tratamento do Logout
//router.get('/logout', verificaToken, (req, res) => {
router.get('/home/logout', (req, res) => {
  //req.session.destroy()
  res.cookie('token', "revogado.revogado.revogado")
  res.redirect('/')
})

// Tratamento do Register
router.get('/register', function(req, res){
  res.render('register')
})

router.post('/register', function(req, res){
  Controller.addUser(req.body)
    .then(response => {
      //res.cookie('token', response.token)
      res.redirect('/')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})
/*
// facebook
router.get('/login/facebook', function(req, res){
  axios.get('http://localhost:8002/auth/facebook')
    .then(response => {
      res.cookie('token', response.token)
      console.log("Entraste crlh!!!!")
      res.redirect('/home')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

// google
router.get('/login/google', function(req, res){
  axios.get('http://localhost:8002/auth/google')
    .then(response => {
      res.cookie('token', response.token)
      console.log("interface index")
      res.redirect('/home')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})
*/
module.exports = router;
