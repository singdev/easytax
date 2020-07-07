const User = require('../../enterprise_business_logic/entity/User');

function getdDayOfTheYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
}

/**
 * 
 * @param {String} name 
 */
function generateId(name) {
    const date = new Date();
    const dayOfYear = getdDayOfTheYear();
    const year = date.getFullYear().toString();
    const yearDigit = year.charAt(year.length-2) + year.charAt(year.length-1);
    const hour = date.getHours() +""+ date.getMinutes() +""+ date.getSeconds();
    let cleanName = name.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
    const split = cleanName.split(' ');
    let initials = split[0].charAt(0);
    if(split[1]){
        initials = initials + split[1].charAt(0);
    }
    return initials.toLowerCase() + "-" + yearDigit + dayOfYear + hour;
}

/**
 * @param {User} user
 */
module.exports = async (user, { userRepository, crypto }) => {
    console.log(user);
    if (!user.password || !user.nom || !user.telephone || !user.email) {
        throw Error("Missing data");
    }
    user.identifiant = generateId(user.nom);
    user.password = await crypto.hash(user.password);
    console.log(user);
    return userRepository.addUser(user);
}