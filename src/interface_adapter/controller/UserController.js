const CreateUser = require('../../application_business_logic/use_case/CreateUser');
const UpdateUser = require('../../application_business_logic/use_case/UpdateUserData');
const GetToken = require('../../application_business_logic/use_case/GenerateUserAccessToken');
const GetUser = require('../../application_business_logic/use_case/GetUser');

const UserRepoMongo = require('../storage/UserRepoMongoDB');
const User = require('../../enterprise_business_logic/entity/User');
const Crypto = require('../../interface_adapter/security/BcryptJS');
const JWTAccessToken = require('../../interface_adapter/security/JWTAccessToken');

module.exports = {

    async createUser(req, res, next) {
        const userRepository = new UserRepoMongo();
        const crypto = new Crypto();
        const user = new User(req.body);

        try {
            const newUser = await CreateUser(user, { userRepository, crypto });
            if (newUser) {
                const accessToken = new JWTAccessToken();
                const token = await GetToken(newUser, { accessToken });
                res.cookie("auth", token);
                res.redirect('/');
                res.render('home', { title: newUser.nom + " | " + Easytax });
            } else {
                res.redirect('/');
                res.sendStatus(500);
            }
        } catch (err) {
            console.log(err);
            res.sendStatus(401);
        }
    },

    async getUser(req, res, next){
        const userRepository = new UserRepoMongo();
        const id = req.auth.credentials.uid;
        const user = await GetUser(id, { userRepository })
        res.send(user);
    },

    async updateUserData(req, res, next) {
        const data = req.body;
        data.password = undefined;
        data.identifiant = undefined;
        data.email = undefined;

        const userRepository = new UserRepoMongo();
        const updateUser = await UpdateUser(req.params.id, data, { userRepository });
        res.send(updateUser);
    }
}