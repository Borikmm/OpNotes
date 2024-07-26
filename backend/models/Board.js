const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    elements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Element' }]
});

module.exports = mongoose.model('Board', BoardSchema);

