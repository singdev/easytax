const bcrypt = require('bcryptjs');

const Crypto = require('../../application_business_logic/security/Crypto');

module.exports = class extends Crypto {

    async hash(data){
        const hashedData = await bcrypt.hash(data, 10);
        return hashedData;
    }

    async compare(data, hash){
        const result = await bcrypt.compare(data, hash);
        return result;
    }
}