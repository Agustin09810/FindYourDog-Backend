const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true
    },
    user: {
        type: String,
        required: true
    },
    dogName: {
        type: String,
        required: true
    },
    dogNicknames: {
        type: [String],
        required: true
    },
    dogGender: {
        type: String,
        required: true
    },
    dogBreed: {
        type: String,
        required: true
    },
    lostOn: {
        type: Date,
        required: true
    },
    lostZone: {
        type: String,
        required: true
    },
    lostDescription: {
        type: String,
        required: false
    },
    dogDescription: {
        type: String,
        required: false
    },
    photos: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);
