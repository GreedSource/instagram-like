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

module.exports = router