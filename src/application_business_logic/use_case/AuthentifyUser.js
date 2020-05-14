const User = require('../../enterprise_business_logic/entity/User');
const UserRepository = require('../persistance/UserRepository');

/**
 * @param {User} user
 */
module.exports = async (identifiant, password, { userRepository, crypto}) => {
    let userFound = await userRepository.findByEmail(identifiant);
    if(userFound == null){
        userFound = await userRepository.findByIdentifiant(identifiant);
    }
    if(userFound == null){
        throw Error("User not found");
    }
    const comparaisonResult = await crypto.compare(password, userFound);
    return comparaisonResult;
}