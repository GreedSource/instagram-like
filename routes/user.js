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
        .exec((err, posts) => {
            if (err){
                return res.status(422).json({error:err})
            }
            res.json({user, posts})
        })
    })
    .catch(err => {
        return res.status(404).json({error: 'User not found'})
    })
})

router.put('/follow', middleware, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.decode._id }
    },{
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        }
        User.findByIdAndUpdate(req.decode._id, {
            $push: { following: req.body.followId }
        }, {
            new: true
        })
        .select('-password')
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            return res.status(422).json({error: err})
        })
    })
})

router.put('/unfollow', middleware, (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: { followers: req.decode._id }
    },{
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        }
        User.findByIdAndUpdate(req.decode._id, {
            $pull: { following: req.body.unfollowId }
        }, {
            new: true
        })
        .select('-password')
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            return res.status(422).json({error: err})
        })
    })
})

router.put('/update', middleware, (req, res) => {
    User.findByIdAndUpdate(req.decode._id, {
        $set: { photo: req.body.photo }
    }, {
        new: true
    },
    (err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        }
        res.json(result)
    })
})

module.exports = router