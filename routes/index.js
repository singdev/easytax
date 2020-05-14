var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.auth){
    res.render('home', { title: Easytax});
  } else {
    res.render('connexion', { title: 'Connexion | Easytax' });
  }
});

router.get('/connexion', function(req, res, next) {
  if(req.cookies.auth){
    res.render('home', { title: Easytax});
  } else {
    res.render('connexion', { title: 'Connexion | Easytax' });
  }
});

router.get('/inscription', function(req, res, next) {
  if(req.cookies.auth){
    res.render('home', { title: Easytax});
  } else {
    res.render('inscription', { title: 'Inscription | Easytax' });
  }
});

module.exports = router;
