const UserRepository = require('../../application_business_logic/persistance/UserRepository');
const UserModel = require('../../framework_driver/database/mongoDB/models/UserModel');

module.exports = class extends UserRepository {

    async addUser(user) {
        const newUser = new UserModel(user);
        const saveUser = await newUser.save();
        return saveUser;
    }

    async getUser(id) {
        const user = await UserModel.find({ _id: id });
        return user;
    }

    async findUsers() {
        const users = await UserModel.find({});
        return users;
    }

    async updateUser(id, data) {
        if (!data.password) {
            const u = await UserModel.findOne({ _id: id });
            data.password = u.password;
        }
        const updateUser = await UserModel.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
        return updateUser;
    }

    async deleteUser(id) {
        const removedUser = await UserModel.findOneAndDelete({ _id: id });
        return removedUser;
    }

    async findByEmail(email) {
        try {
            const user = await UserModel.findOne({ email });
            return user;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async findByIdentifiant(identifiant) {
        const user = await UserModel.findOne({ identifiant });
        return user;
    }
}