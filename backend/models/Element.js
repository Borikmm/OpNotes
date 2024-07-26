const mongoose = require('mongoose');

const ElementSchema = new mongoose.Schema({
    type: { type: String, required: true },
    content: { type: String, required: true },
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' }
});

module.exports = mongoose.model('Element', ElementSchema);

