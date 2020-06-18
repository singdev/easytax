var authController = require('../src/interface_adapter/controller/AuthController');
var express = require('express');
var router = express.Router();


router.post('/', authController.verifyAccessToken, async function (req, res, next) {
});

router.get('/', authController.verifyAccessToken, async function (req, res, next) {
});

router.put('/', authController.verifyAccessToken, async function (req, res, next) {
});

module.exports = router;