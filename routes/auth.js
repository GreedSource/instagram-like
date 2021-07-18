const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = mongoose.model('user')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: process.env.SENDGRID_API_KEY
    }
}))

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
                transporter.sendMail({
                    to: `${user.name} <${user.email}>`,
                    from: 'no-reply <joelgarciia95@gmail.com>',
                    subject: 'Signup success',
                    html: `<h1>Welcome to MERN Instagram</h1>`
                })
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

router.post('/reset-password', (req, res) => {
    crypto.randomBytes(32, (err, buf) => {
        if(err){
            return res.status(500).json({error: 'could not generate token'})
        }
        const token = buf.toString('hex')
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(422).json({error: 'user does not exist'})
            }
            user.password = crypto.randomBytes(10).toString('hex')
            user.save()
            .then(user => {
                transporter.sendMail({
                    to: `${user.name} <${user.email}>`,
                    from: '',
                    subject: 'Reset password',
                    html: `<h1>Reset password</h1>
                        <p>Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password</p>`
                })
                res.json({message: 'password reset email sent'})
            })
            .catch(err => {
                console.log(err)
            }) 
        })
    })
})

module.exports = router