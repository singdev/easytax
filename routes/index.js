var express = require('express');
var router = express.Router();

var GetTokenData = require('../src/application_business_logic/use_case/GetTokenData');
var JWT = require('../src/interface_adapter/security/JWTAccessToken');
var GetUser = require('../src/application_business_logic/use_case/GetUser');
var UserRepository = require('../src/interface_adapter/storage/UserRepoMongoDB');
var User = require('../src/enterprise_business_logic/entity/User');
var UpdateUser = require("../src/application_business_logic/use_case/UpdateUserData");
var authController = require('../src/interface_adapter/controller/AuthController');

function renderHome(req, res) {
  renderPage(req, res, 'home', 'Easytax');
}

function renderProfil(req, res){
  renderPage(req, res, 'profil', 'Easytax');
}

function renderDeclaration(req, res){
  renderPage(req, res, 'declaration', 'Easytax');
}

async function renderPage(req, res, page, title){
  const accessToken = new JWT();
  const userRepository = new UserRepository();
  const decoded = await GetTokenData(req.cookies.auth, { accessToken });
  const userGet = await GetUser(decoded.uid, { userRepository });
  const user = new User(userGet[0]);
  res.render(page, { title: title, user });
}

function getStatus(formeJuridique) {
  if (formeJuridique == "SARL" ||
    formeJuridique == "SUARL" ||
    formeJuridique == "Société Anonyme" ||
    formeJuridique == "Particulier" ||
    formeJuridique == "Entreprise individuelle") {
    return "p";
  } else {
    return "s";
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.cookies.auth) {
    renderHome(req, res);
  } else {
    res.render('connexion', { title: 'Connexion | Easytax' });
  }
});

router.get('/connexion', function (req, res, next) {
  if (req.cookies.auth) {

    res.redirect("/");
    renderHome(req, res);
  } else {
    res.render('connexion', { title: 'Connexion | Easytax' });
  }
});

router.get('/inscription', function (req, res, next) {
  if (req.cookies.auth) {
    res.redirect("/");
    renderHome(req, res);
  } else {
    res.render('inscription', { title: 'Inscription | Easytax' });
  }
});

router.get('/deconnexion', function (req, res, next) {
  res.clearCookie('auth');
  res.render('connexion', { title: 'Connexion | Easytax' });
});

router.get('/declaration', function (req, res, next) {
  renderDeclaration(req, res);
});

router.get('/profil', function (req, res, next) {
  renderProfil(req, res);
});

router.post('/situation-fiscale/forme-juridique', authController.verifyAccessToken, async function (req, res, next) {
  const userRepository = new UserRepository();
  const newUser = await UpdateUser(req.auth.credentials.uid, req.body, { userRepository });
  const formeJuridique = req.body.formeJuridique;
  const status = getStatus(formeJuridique);
  if (status == "p") {
    res.render('situation_fiscale_particulier', { user: newUser, title: "Situation Fiscale" });
  } else {
    res.render('situation_fiscale_societe', { user: newUser, title: "Situation Fiscale" });
  }
});

router.get('/situation-fiscale', authController.verifyAccessToken, async function (req, res, next) {
  const userRepository = new UserRepository();
  const user = await GetUser(req.auth.credentials.uid, { userRepository });
  const formeJuridique = user[0].formeJuridique;
  console.log(user);
  const status = getStatus(formeJuridique);
  if (status == "p") {
    res.render('situation_fiscale_particulier', { user: user[0], title: "Situation Fiscale" });
  } else {
    res.render('situation_fiscale_societe', { user: user[0], title: "Situation Fiscale" });
  }
});

module.exports = router;
