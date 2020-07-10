const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('Notification', Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'Users' },
    date: { type: Date, default: Date.now() },
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    isRead: { type: Boolean, default: false }
}));