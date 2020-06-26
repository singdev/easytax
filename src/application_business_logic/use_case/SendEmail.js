const MailSender = require('../utils/MailSender');
const { sub } = require('../constants/DomainURL');

/**
 * 
 * @param {String} email 
 * @param {String} content 
 * @param {MailSender} mailSender
 */
module.exports = async (email, subject, content, mailSender) => {
    const res = await mailSender.sendEmail(email, subject, content);
    return res;
}