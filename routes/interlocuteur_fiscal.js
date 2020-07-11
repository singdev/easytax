var authController = require('../src/interface_adapter/controller/AuthController');
var express = require('express');
var router = express.Router();

router.get('/', authController.verifyAccessToken, async function (req, res, next) {
    res.render('interlocuteur_fiscal/interlocuteur_fiscal_form', { title: "Determination de l'interlocuteur fiscal | Easytax"});
});

module.exports = router;