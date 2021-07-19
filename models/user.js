const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    photo: {
        type: String,
        default: 'https://res.cloudinary.com/greedsource/image/upload/v1626656345/old-man_athuoc.jpg'
    },
    followers: [{
        type: ObjectId,
        ref: 'user'
    }],
    following: [{
        type: ObjectId,
        ref: 'user'
    }],
    resetToken: String,
    expireToken: Date,
})

module.exports = mongoose.model('user', userSchema)