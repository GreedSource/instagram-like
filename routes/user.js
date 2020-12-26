const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model('post')
const User = mongoose.model('user')
const middleware = require('../middleware/auth')

router.get('/:id', middleware, (req, res) => {
    User.findOne({ _id: req.params.id})
    .select('-password')
    .then(user => {
        Post.find({postedBy: req.params.id})
        .populate('postedBy', '_id name')
        .exec((err, post) => {
            if (err){
                return res.status(422).json({error:err})
            }
            res.json({user, post})
        })
    })
    .catch(err => {
        return res.status(404).json({error: 'User not found'})
    })
})

module.exports = router