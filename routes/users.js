var express = require('express');
var router = express.Router();

var userController = require('../src/interface_adapter/controller/UserController');
var authController = require('../src/interface_adapter/controller/AuthController');


/* GET users listing. */
router.post('/', function(req, res, next) {
  userController.createUser(req, res, next);
});

router.post('/auth', function(req, res, next) {
  authController.authenticateUserAndGenerateAccessToken(req, res, next);
});

router.get('/auth', authController.verifyAccessToken, function(req, res, next){
  userController.getUser(req, res, next);
});

module.exports = router;
