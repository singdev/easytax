const CreateUser = require('../../application_business_logic/use_case/CreateUser');
const UpdateUser = require('../../application_business_logic/use_case/UpdateUserData');
const UserRepoMongo = require('../storage/UserRepoMongoDB');
const User = require('../../enterprise_business_logic/entity/User');
module.exports = {

    async createUser(req, res, next){
        const userRepository = new UserRepoMongo();
        const user = new User(req.body);

        const newUser = await CreateUser(user, { userRepository });
        if(newUser){
            res.send(newUser);
        } else {
            res.sendStatus(500);
        }
    },

    updateUserData(req, res, next){
        const data = req.body;
        data.password = undefined;
        data.identifiant = undefined;
        data.email = undefined;

        const userRepository = new UserRepoMongo();
        const updateUser = await UpdateUser(req.params.id, data, { userRepository });
        res.send(updateUser);
    }
}