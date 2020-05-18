
module.exports = async (user, { accessToken}) => {
    console.log(user);
    const token = await accessToken.generateAccessToken({ uid: user._id });
    return token;
}