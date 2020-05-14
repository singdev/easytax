const mongoose = require('mongoose');

/**
 * @param {String} dbName 
 */
module.exports = (dbName) => {
    mongoose.connect("mongodb://localhost:27018/" + dbName, {
        useCreateIndex: true,
        useNewUrlParser: true, useFindAndModify: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('error', (err) => {
        console.log(err);
    });
}

