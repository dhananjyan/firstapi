const mongoose = require('mongoose')
var moment = require('moment');

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
eventSchema.pre('save', function(next) {
    this.start = moment(this.start).zone(-330).format()
    this.end = moment(this.end).zone(-330).format()
    return next()
})
module.exports = mongoose.model('Event', eventSchema)