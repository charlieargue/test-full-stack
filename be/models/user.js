const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', schema)

