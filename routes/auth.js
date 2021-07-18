const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = mongoose.model('user')

router.post('/signup', (req, res) => {
    const {name, email, password, photo} = req.body
    if(!email || !password || !name){
        return res.status(422).json({error: 'please add all the fields'})
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error: 'user already exists with that email'})
        }
        bcrypt.hash(password, 10)
        .then(hashedPassword => {
            const user = new User({
                email, 
                password: hashedPassword, 
                name,
                photo
            })
            user.save()
            .then(user => {
                res.json({message: 'saved successfully'})
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/signin', (req, res) =>{
    const { email, password } = req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email: email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error: 'invalid email or password'})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if (doMatch) {
                const token = jwt.sign({_id: savedUser._id}, process.env.SECRET)
                const {_id, name, email, following, followers, photo } = savedUser 
                res.json({token, user: {_id, name, email, following, followers, photo}})
            }else{
                return res.status(422).json({error: 'invalid email or password'})
            }
        }).catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router