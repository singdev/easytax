const User = require('../../enterprise_business_logic/entity/User');

/**
 * @param {User} user
 */
module.exports = async (user, { userRepository, crypto }) => {

    console.log(user);
    if(!user.password || !user.nom || !user.telephone || !user.email){
        throw Error("Missing data");
    }
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    user.identifiant = user.nom.split(' ')[0] + "-" + "easytax" + "-" + new Date().getDate() + h+m+s;
    user.password = await crypto.hash(user.password);

    return userRepository.addUser(user);
}