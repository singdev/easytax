
module.exports = async (id, userData, { userRepository }) => {
    const user = await userRepository.updateUser(id, userData);
    return user;
}