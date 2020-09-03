const express = require('express')
const router = express.Router();

const Bcrypt = require('../../src/interface_adapter/security/BcryptJS');

const authController = require('../../src/interface_adapter/controller/AuthController');
const userController = require('../../src/interface_adapter/controller/UserController');

const GetUser = require('../../src/application_business_logic/use_case/GetUser');
const UpdateUserData = require('../../src/application_business_logic/use_case/UpdateUserData');

const UserRepository = require('../../src/interface_adapter/storage/UserRepoMongoDB');

const userRepository = new UserRepository();
const bcrypt = new Bcrypt();

router.get('/forfait', authController.verifyAccessToken, function (req, res, next) {
    userController.getForfait(req, res, next);
})

router.get('/auth', authController.verifyAccessToken, async (req, res, next) => {
    const users = await GetUser(req.auth.credentials.uid, { userRepository });
    res.json(users[0]);
});

router.put('/', authController.verifyAccessToken, async (req, res, next) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password);
    }
    console.log(req.body);
    const result = await UpdateUserData(req.auth.credentials.uid, req.body, { userRepository });
    res.json(result);
});

router.get('/forgot-password/:email', userController.forgotPassword);

module.exports = router;