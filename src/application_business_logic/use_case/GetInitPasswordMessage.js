const AccessToken = require('../security/AccessToken');
const User = require('../../enterprise_business_logic/entity/User');
const Address = require('../constants/DomainURL');
const GenerateUserAccessToken = require('./GenerateUserAccessToken');
/**
 * 
 * @param {User} user 
 * @param {AccessToken} accessToken 
 */
module.exports = async (user, accessToken) => {
  const token = await GenerateUserAccessToken(user, { accessToken});
  const html = `
        <html> 
          <h1>Cliquez sur le lien ci-dessous pour changer votre mot de passe</h1>
          <a href="http://${Address}/users/forgot-password/${token}">Changez votre mot de passe</a>
        </html>
    `;
  return html;
}