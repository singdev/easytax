
module.exports = async (user, { accessToken}) => {
    const token = await accessToken.generateAccessToken(user);
    return token;
}