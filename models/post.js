const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{type:objectId, ref:'user'}],
    postedBy:{
        type: ObjectId,
        ref: "user"
    }
})

mongoose.model('post', postSchema)

