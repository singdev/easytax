const mongoose = require('mongoose');

/**
 * @param {String} dbName 
 */
module.exports = (dbName) => {
    mongoose.connect("mongodb://localhost:27017/" + dbName, {
        useCreateIndex: true,
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

    mongoose.connection.on('error', (err) => {
        console.log(err);
    });
}

