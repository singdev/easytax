var authController = require('../src/interface_adapter/controller/AuthController');
var express = require('express');
var router = express.Router();
var FormeJuridique = require('../src/enterprise_business_logic/entity/FormeJuridique');

var UpdateUser = require("../src/application_business_logic/use_case/UpdateUserData");
var GetUser = require('../src/application_business_logic/use_case/GetUser');
var UserRepository = require('../src/interface_adapter/storage/UserRepoMongoDB');


function getStatus(formeJuridique) {
    const formeJuridiqueType = FormeJuridique.forme_juridique_type.find(v => v.value == formeJuridique);
    console.log(formeJuridique);
    console.log(formeJuridiqueType);
    return formeJuridiqueType.type;
    /*if (formeJuridique == "SARL" ||
      formeJuridique == "SUARL" ||
      formeJuridique == "Société Anonyme" ||
      formeJuridique == "Particulier" ||
      formeJuridique == "Entreprise individuelle") {
      return "p";
    } else {
      return "s";
    }*/
  }


router.post('/forme-juridique', authController.verifyAccessToken, async function (req, res, next) {
    const userRepository = new UserRepository();
    const newUser = await UpdateUser(req.auth.credentials.uid, req.body, { userRepository });
    const formeJuridique = req.body.formeJuridique;
    const status = getStatus(formeJuridique);
    if (status == "p") {
      res.render('situation_fiscale/situation_fiscale_particulier', { user: newUser, title: "Situation Fiscale particulier" });
    } else {
      res.render('situation_fiscale/situation_fiscale_societe', { user: newUser, title: "Situation Fiscale société" });
    }
  });
  
  router.get('/', authController.verifyAccessToken, async function (req, res, next) {
    const userRepository = new UserRepository();
    const user = await GetUser(req.auth.credentials.uid, { userRepository });
    const formeJuridique = user[0].formeJuridique;
    const status = getStatus(formeJuridique);
    if (status == "p") {
      res.render('situation_fiscale/situation_fiscale_particulier', { user: user[0], title: "Situation Fiscale particulier" });
    } else {
      res.render('situation_fiscale/situation_fiscale_societe', { user: user[0], title: "Situation Fiscale société" });
    }
  });

  module.exports = router;