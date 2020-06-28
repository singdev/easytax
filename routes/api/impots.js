const express = require('express')
const router = express.Router();

const authController = require('../../src/interface_adapter/controller/AuthController');
const impots = require('../../src/framework_driver/database/memory/index').impots;

router.get('/', authController.verifyAccessToken, (req, res, next) => {
    res.json(impots);
}); 

module.exports = router;