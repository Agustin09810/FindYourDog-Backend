const mongoose = require('mongoose');


const departmentSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    zonesIds:{
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Department', departmentSchema);