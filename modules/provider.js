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
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    tel: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

providerSchema.post('findOne', function(provider, next) {
    if (!provider) {
       return next(new Error('Authentication failed')) 
    }
    return next()
})
module.exports = mongoose.model('Provider', providerSchema)