const ForfaitRepo = require('../../application_business_logic/persistance/ForfaitRepository');

const Forfait = require('../../framework_driver/database/mongoDB/models/Forfait');

module.exports = class extends ForfaitRepo {

    async create(forfait){
        const f = new Forfait(forfait);
        return await f.save();
    }

    async findLastByUser(userId){
        const a = await Forfait.find({ user: userId });
        console.log("Le forfait");
        console.log(a);
        console.log("Le forfait");
        return a.length == 0 ? null : a[a.length-1];
    }

    async findByUser(userId){
        return await Forfait.find({ user: userId });
    }

}