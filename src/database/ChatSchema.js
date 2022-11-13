const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    messagesIds: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Chat', chatSchema);