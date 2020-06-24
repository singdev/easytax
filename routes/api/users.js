const express = require('express')
const router = express.Router();

const authController = require('../../src/interface_adapter/controller/AuthController');
const GetUser = require('../../src/application_business_logic/use_case/GetUser');
const UpdateUserData = require('../../src/application_business_logic/use_case/UpdateUserData');

const UserRepository = require('../../src/interface_adapter/storage/UserRepoMongoDB');

const userRepository = new UserRepository();

router.get('/auth', authController.verifyAccessToken, async (req, res, next) => {
    const users = await GetUser(req.auth.credentials.uid, { userRepository});
    res.json(users[0]);
}); 

router.put('/', authController.verifyAccessToken, async (req, res, next) => {
    const result = await UpdateUserData(req.auth.credentials.uid, req.body, { userRepository });
    res.json(result);
});

module.exports = router;