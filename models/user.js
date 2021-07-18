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
        default: 'https://res.cloudinary.com/greedsource/image/upload/v1610245677/bpnospb1wlvwlf6xqlak.jpg'
    },
    followers: [{
        type: ObjectId,
        ref: 'user'
    }],
    following: [{
        type: ObjectId,
        ref: 'user'
    }],
})

module.exports = mongoose.model('user', userSchema)