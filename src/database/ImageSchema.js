const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ImagePost', ImageSchema);