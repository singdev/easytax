var authController = require('../src/interface_adapter/controller/AuthController');
var express = require('express');
var router = express.Router();

const Alert = require('../src/framework_driver/database/mongoDB/models/AlertModel');

router.post('/', authController.verifyAccessToken, async function (req, res, next) {
    const alert = new Alert(req.body);
    try {
        const result = await alert.save();
        console.log(result);
        res.json(result); 
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/', authController.verifyAccessToken, async function (req, res, next) {
});

router.post('/update', authController.verifyAccessToken, async function (req, res, next) {
});

module.exports = router;