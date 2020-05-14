const User = require('../../enterprise_business_logic/entity/User');

/**
 * @param {User} user
 */
module.exports = async (user, { userRepository, crypto }) => {

    if(!user.password || !user.identifiant || !user.nom){
        throw Error("Missing data");
    }
    user.password = await crypto.hash(user.password);

    return userRepository.addUser(user);
}