const mongoose = require('mongoose')

const providerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    doctorName: {
        type: String,
        required: true,
        trim: true
    },
    connectInfo: {
        tel: {
            type: Number,
            required: true
        },
        email: [String],
        address: {
            city: String,
            street: String,
            houseNumber: String
        }
    }
})
module.exports = mongoose.model('Provider', providerSchema)