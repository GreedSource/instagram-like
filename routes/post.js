const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model('post')
const middleware = require('../middleware/auth')

router.get('/', middleware, (req, res) => {
    Post.find()
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt')
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/getsubpost', middleware, (req, res) => {
    Post.find({postedBy: {$in: req.decode.following}})
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt')
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
        $push : {likes: req.decode._id}
    }, {
        new: true
    })
    .populate('postedBy', '_id name')
    .exec((err, response) =>{
        if(err){
            return res.status(422).json({error: err})
        }else{
            res.json(response)
        }
    })
})

router.put('/unlike', middleware, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull : {likes: req.decode._id}
    }, {
        new: true
    })
    .populate('postedBy', '_id name')
    .exec((err, response) =>{
        if(err){
            return res.status(422).json({error: err})
        }else{
            res.json(response)
        }
    })
})

router.put('/comment', middleware, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.decode._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push : {comments: comment}
    }, {
        new: true
    })
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((err, response) =>{
        if(err){
            return res.status(422).json({error: err})
        }else{
            res.json(response)
        }
    })
})

router.delete('/deletepost/:postId', middleware, (req, res) => {
    Post.findOne({_id:req.params.postId})
    .populate('postedBy', '_id')
    .exec((err, post) => {
        if (err || !post){
            return res.status(422).json({error:err})
        }
        if (post.postedBy._id.toString() === req.decode._id.toString()){
            post.remove()
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
        }
    })
})

module.exports = router