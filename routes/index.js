var express = require('express');
var router = express.Router();

const Alert = require('../src/framework_driver/database/mongoDB/models/AlertModel');

var GetTokenData = require('../src/application_business_logic/use_case/GetTokenData');
var JWT = require('../src/interface_adapter/security/JWTAccessToken');
var GetUser = require('../src/application_business_logic/use_case/GetUser');
var UserRepository = require('../src/interface_adapter/storage/UserRepoMongoDB');
var User = require('../src/enterprise_business_logic/entity/User');
const { render } = require('pug');

function renderHome(req, res, data) {
  renderPageWithUser(req, res, 'home/ma_fiscalite', 'Easytax', data);
}

function renderProfil(req, res) {
  renderPageWithUser(req, res, 'home/profil', 'Easytax');
}

function renderFacturation(req, res){
  renderPageWithUser(req, res, 'home/facturation', 'Easytax');
}

function renderDeclaration(req, res) {
  renderPageWithUser(req, res, 'home/declaration', 'Easytax');
}

async function renderPageWithUser(req, res, page, title, data) {
  const accessToken = new JWT();
  const userRepository = new UserRepository();
  const decoded = await GetTokenData(req.cookies.auth, { accessToken });
  const userGet = await GetUser(decoded.uid, { userRepository });

  const user = new User(userGet[0]);

  res.render(page, { title: title, user, data });
}

/* GET home page. */
router.get('/', async function (req, res, next) {
  if (req.cookies.auth) {
    const accessToken = new JWT();
    const user = await GetTokenData(req.cookies.auth, { accessToken });
    console.log(user);
    //Get alert paiement
    const alerts = await Alert.find({ user: user.uid });
    console.log(alerts);
    //Render index
    renderHome(req, res, { alerts });
  } else {
    res.render('adhesion/connexion', { title: 'Connexion | Easytax' });
  }
});

router.get('/connexion', function (req, res, next) {
  if (req.cookies.auth) {
    res.redirect("/");
    renderHome(req, res);
  } else {
    res.render('adhesion/connexion', { title: 'Connexion | Easytax' });
  }
});

router.get('/inscription', function (req, res, next) {
  if (req.cookies.auth) {
    res.redirect("/");
    renderHome(req, res);
  } else {
    res.render('adhesion/inscription', { title: 'Inscription | Easytax' });
  }
});

router.get('/deconnexion', function (req, res, next) {
  res.clearCookie('auth');
  res.render('adhesion/connexion', { title: 'Connexion | Easytax' });
});

router.get('/declaration', function (req, res, next) {
  renderDeclaration(req, res);
});

router.get('/profil', function (req, res, next) {
  renderProfil(req, res);
});

router.get('/facturation', function (req, res, next) {
  renderFacturation(req, res);
});

router.get('/profil-situtation-fiscale', function (req, res, next) {
  renderPageWithUser(req, res, 'situation_fiscale/situation_fiscale_view', 'Situation fiscale | Easytax');
});

router.get('/forgot-password', function (req, res, next) {
  res.render('adhesion/forgot_password', { title: "Mot de passe oublié"})
});

router.get('/users/forgot-password/:token', function (req, res, next) {
  const token = req.params.token;
  res.cookie("auth", token);
  res.render('adhesion/change_forgot_password', { title: "Mot de passe oublié"})
});

module.exports = router;
