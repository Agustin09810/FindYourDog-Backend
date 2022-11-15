const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactsIds: {
        type: [String],
        required: true
    },
    postsIds: {
        type: [String],
        required: true
    },
    chatsIds: {
        type: [String],
        required: true
    },
    profileImg: {
        type: String,
        required: true
    },
    departmentId: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);