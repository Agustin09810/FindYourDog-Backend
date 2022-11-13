const mongoose = require('mongoose');


const zoneSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imgId:{
        type: String,
        required: true
    },
    postsIds:{
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Zone', zoneSchema);