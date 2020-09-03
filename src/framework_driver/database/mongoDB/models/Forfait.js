const mongoose = require('mongoose');


module.exports = mongoose.model('Forfait', mongoose.Schema({
    type: { type: Number, enum: [0, 1, 2, 3] },
    debut: { type: Date },
    fin: { type: Date },
    user: { type: mongoose.Types.ObjectId, ref: 'Users' }
}));
