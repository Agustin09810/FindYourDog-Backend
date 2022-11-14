const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Image', imageSchema);