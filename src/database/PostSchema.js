const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    postImg:{
        id:{type: String}, url:{type:String}
    },
    tags:{
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);