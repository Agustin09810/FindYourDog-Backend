const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    iconUrl:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    postsId:{
        type: [String],
        required: true
    },
    friendsId:{
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);