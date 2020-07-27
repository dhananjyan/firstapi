const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    allDay: {
        type: Boolean,
        default: false
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Provider'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
module.exports = mongoose.model('Event', eventSchema)