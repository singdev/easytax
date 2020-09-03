module.exports = async (forfait, forfaitRepo) => {
    try {
        const f = await forfaitRepo.create(forfait);
        return f;
    } catch(err){
        console.log(err);
        return null;
    }
}