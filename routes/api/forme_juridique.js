const express = require('express')
const router = express.Router();

const authController = require('../../src/interface_adapter/controller/AuthController');
const formJuridique = require('../../src/framework_driver/database/memory/index').formeJuridique;

router.get('/', authController.verifyAccessToken, (req, res, next) => {
    res.json(formJuridique);
}); 

module.exports = router;