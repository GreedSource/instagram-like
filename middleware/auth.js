const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const User = mongoose.model('user')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization){
        return res.status(401).json({error: 'No token provider'})
    }
    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if(err){
            return res.status(401).json({error: 'Failed to authenticate token'})
        }
        const { _id } = payload;
        User.findById(_id).then(user => {
            req.decode = user
            next()
        })
    })
}