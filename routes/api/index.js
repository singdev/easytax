const impots = require('./impots');

module.exports = (app) => {
    app.use('/api/impots', impots);
}