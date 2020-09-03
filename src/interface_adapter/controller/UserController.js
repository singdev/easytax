const CreateUser = require('../../application_business_logic/use_case/CreateUser');
const UpdateUser = require('../../application_business_logic/use_case/UpdateUserData');
const GetToken = require('../../application_business_logic/use_case/GenerateUserAccessToken');
const GetUser = require('../../application_business_logic/use_case/GetUser');
const SearchUserByEmail = require('../../application_business_logic/use_case/SearchUserByEmail');
const SendEmail = require('../../application_business_logic/use_case/SendEmail');
const GetInitPasswordMessage = require('../../application_business_logic/use_case/GetInitPasswordMessage');
const GetLastForfait = require('../../application_business_logic/use_case/GetLastForfait');

const MailSender = require('../messages/GMailSender');
const EMAIL = require('../../application_business_logic/constants/email')
const UserRepoMongo = require('../storage/UserRepoMongoDB');
const ForfaitRepo = require('../storage/ForfaitRepoMongoDB');
const User = require('../../enterprise_business_logic/entity/User');
const Crypto = require('../../interface_adapter/security/BcryptJS');
const JWTAccessToken = require('../../interface_adapter/security/JWTAccessToken');
const CreateForfait = require('../../application_business_logic/use_case/CreateForfait');

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

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
            } else {
                res.render("adhesion/inscription", { title: "Inscription | Eeasytax", error: "Un utilisateur avec ce nom existe déjà"});
            }
        } catch (err) {
            console.log(err);
            res.sendStatus(401);
        }
    },

    async getUser(req, res, next) {
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
    },

    async forgotPassword(req, res, next){
        const email = req.params.email;

        const userRepository = new UserRepoMongo();
        const mailSender = new MailSender(EMAIL.email, EMAIL.passowrd);

        const user = await SearchUserByEmail(email, userRepository);
        try {
            if(user){
                console.log(user);
                const accessToken = new JWTAccessToken();
                const message = await GetInitPasswordMessage(user, accessToken);
                const sendingResult = await SendEmail(email, "Compte Easytax : Mot de passe oublié", message, mailSender);
                if(sendingResult){
                    console.log("Sending");
                    console.log(sendingResult);
                    res.sendStatus(200);
                } else {
                    console.log("Error");
                    res.sendStatus(500);
                }
            } else {
                console.log("Error");
                res.sendStatus(401);
            }
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    },

    async createForfait(req, res, next){
        const forfaitRepo = new ForfaitRepo();
        try {
            const now = new Date();
            const last = addDays(now, Number.parseInt(req.body.month_count));
            const id = req.auth.credentials.uid;
            const forfait = {
                type: req.body.type,
                debut: now,
                fin: last,
                user: id
            };
            console.log(forfait);
            await CreateForfait(forfait, forfaitRepo);
            res.status(200);
            res.redirect("/facturation");
        } catch(err){
            console.log(err);
            res.status(500);
            res.redirect("/facturation");
        }
    },

    async getForfait(req, res, next){
        const forfaitRepo = new ForfaitRepo();
        try {
            const result = await GetLastForfait(req.auth.credentials.uid, forfaitRepo);
            res.send(result);
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    },
}