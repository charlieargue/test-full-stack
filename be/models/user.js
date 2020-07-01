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
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

module.exports = mongoose.model('User', schema)

