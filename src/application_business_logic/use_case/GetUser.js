

module.exports = async (id, { userRepository }) => {
    const user = await userRepository.getUser(id);
    return user;
}