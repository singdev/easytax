const ForfaitRepo = require('../../application_business_logic/persistance/ForfaitRepository');

const Forfait = require('../../framework_driver/database/mongoDB/models/Forfait');

module.exports = class extends ForfaitRepo {

    async create(forfait){
        const f = new Forfait(forfait);
        return await f.save();
    }

    async findLastByUser(userId){
        return await Forfait.findOne({ user: userId });
    }

    async findByUser(userId){
        return await Forfait.find({ user: userId });
    }

}