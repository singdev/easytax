const AuthUser = require('../../application_business_logic/use_case/AuthentifyUser');
const GetToken = require('../../application_business_logic/use_case/GenerateUserAccessToken');
const JWTAccessToken = require('../security/JWTAccessToken');
const UserRepoMongo = require('../storage/UserRepoMongoDB');
const Crypto = require('../security/BcryptJS');
const GetTokenData = require('../../application_business_logic/use_case/GetTokenData');

module.exports = {

    async authenticateUserAndGenerateAccessToken(req, res, next) {
        if (req.body.granttype !== 'password' || !req.body.password || !req.body.identifiant) {
            res.sendStatus(401);
            return;
        }
        try {
            const userRepository = new UserRepoMongo();
            const accessToken = new JWTAccessToken();
            const crypto = new Crypto();

            const user = await AuthUser(req.body.identifiant, req.body.password, { userRepository, crypto });
            if (user) {
                const token = await GetToken(user, { accessToken });
                res.cookie("auth", token);
                res.redirect('/');
            } else {
                res.status(401);
                res.redirect('/');
            }
        } catch (err) {
            console.log(err);
            res.status(403);
            res.redirect('/');
        }
    },

    async verifyAccessToken(req, res, next) {
        const accessToken = req.cookies.auth;
        console.log(accessToken);
        try {
            const decoded = await GetTokenData(accessToken, { accessToken: new JWTAccessToken() });

            req.auth = {
                credentials: decoded,
                artifact: { accessToken }
            }
            next()
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }

    }
}