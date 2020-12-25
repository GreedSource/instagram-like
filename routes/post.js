const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model('post')
const middleware = require('../middleware/auth')

router.get('/', middleware, (req, res) => {
    Post.find()
    .populate('postedBy', '_id name')
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/createpost', middleware, (req, res) => {
    const { title, body, photo } = req.body
    if (!title || !body || !photo){
        res.status(422).json({error: 'please add all the fields'})
    }
    const post = new Post({
        title,
        body,
        photo,
        postedBy: req.decode
    })
    post.save()
    .then(result => {
        res.json({message:result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/mypost', middleware, (req, res) => {
    Post.find({postedBy: req.decode._id})
    .populate('postedBy', '_id name')
    .then(posts => {
        res.json({posts})
    })
    .catch(err =>{
        console.log(err)
    })
})

router.put('/like', middleware, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push = {likes: req.user._id}
    }, {
        new: true
    }).exec((err, response) =>{
        if(err){
            return res.status(422).json({error: err})
        }else{
            res.json(response)
        }
    })
})

router.put('/like', middleware, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull = {likes: req.user._id}
    }, {
        new: true
    }).exec((err, response) =>{
        if(err){
            return res.status(422).json({error: err})
        }else{
            res.json(response)
        }
    })
})

module.exports = router