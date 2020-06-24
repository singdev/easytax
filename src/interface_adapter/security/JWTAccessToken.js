const jwt = require('jsonwebtoken');
const AccessToken = require('../../application_business_logic/security/AccessToken');

const JWT_SECRETE_KEY = "yohannmonfils2020";

module.exports = class extends AccessToken {

    async generateAccessToken(payload){
        const token = await  jwt.sign(payload, JWT_SECRETE_KEY);
        return token;
    }

    async decodAccessToken(accessToken){
        const decoded =  await jwt.verify(accessToken, JWT_SECRETE_KEY);
        return decoded;
    }
}