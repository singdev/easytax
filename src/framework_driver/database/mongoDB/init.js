const mongoose = require('mongoose');

const host = process.env.MONGO_HOST || 'localhost';

/**
 * @param {String} dbName 
 */
module.exports = (dbName) => {
    mongoose.connect("mongodb://"+ host + ":27017/" + dbName, {
        useCreateIndex: true,
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

    mongoose.connection.on('error', (err) => {
        console.log(err);
    });
}

