const UserRepository = require('../persistance/UserRepository');

/**
 * @param {String} email
 * @param { UserRepository} userRepository
 */
module.exports = async (email,  userRepository) => {
    const user = await userRepository.findByEmail(email);
    return user;
}