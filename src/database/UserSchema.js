const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactsUsernames: {
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
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
      },
      confirmationCode: { 
        type: String, 
        unique: true },
});

module.exports = mongoose.model('User', UserSchema);