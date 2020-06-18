const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const impots = require('../../memory/index').impots;

module.exports = mongoose.model('Alert', Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    date_limite: { type: Date, require: true },
    date_alert: { type: Date, require: true },
    active: { type: Boolean, default: true },
    impot: { type: String, enum: impots }
}));