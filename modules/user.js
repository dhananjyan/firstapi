const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
})
userSchema.post('findOne', function(user, next) {
    if (!user) {
        console.log('error')
       return next(new Error('Authentication failed')) 
    }
    return next()
    // if(error) {
    //     next(error)
    // } else {
    //     console.log(user)
    //     if (!user) {
    //         next(new Error('Authentication failed')) 
    //     } else {
    //         next()
    //     }
    // }
})
module.exports = mongoose.model('User', userSchema)