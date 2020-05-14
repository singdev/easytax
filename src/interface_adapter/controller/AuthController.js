const AuthUser = require('../../application_business_logic/use_case/AuthentifyUser');
const GetToken = require('../../application_business_logic/use_case/GenerateUserAccessToken');
const JWTAccessToken = require('../security/JWTAccessToken');
const UserRepoMongo = require('../storage/UserRepoMongoDB');
const Crypto = require('../security/BcryptJS');

module.exports = {

    async authenticateUserAndGenerateAccessToken(req, res, next){
        if(req.body.granttype !== 'password' || !req.password || !req.identifiant){
            res.sendStatus(401);
            return;
        }
        try {
            const userRepository = new UserRepoMongo();
            const accessToken = new JWTAccessToken();
            const crypto = new Crypto();

            const user = await AuthUser(req.identifiant, req.password, { userRepository, crypto });
            if(user){
                const token = await GetToken(user, { accessToken });
                res.send(token);
            } else {
                res.sendStatus(401);
            }
        } catch(err){
            console.log(err);
            res.sendStatus(403);
        }
    },

    async verifyAccessToken(req, res, next){
        //TODO 
    }
}