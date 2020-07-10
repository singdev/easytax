const impots = require('./impots');
const formeJuridique = require('./forme_juridique');
const users = require('./users');
const alert = require('./alert');
const notification = require('./notification');

module.exports = (app) => {
    app.use('/api/impots', impots);
    app.use('/api/forme-juridique', formeJuridique);
    app.use('/api/users', users);
    app.use('/api/alerts', alert);
    app.use('/api/notifications', notification);
}