
module.exports = async (userId, forfaitRepo) => {
    const forfait = await forfaitRepo.findLastByUser(userId);
    return forfait;
}