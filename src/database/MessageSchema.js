const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    originUsername: {
        type: String,
        required: true
    },
    targetUsername: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);