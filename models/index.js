const mongoose = require('mongoose')
// const connection = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9b1df.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
const connection = process.env.MONGODB_URI;

mongoose.set("debug", true)
mongoose.Promise = global.Promise
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true  })

mongoose.connection.on('connected', () => {
    console.log('connection stablished')
})

mongoose.connection.on('error', (err) => {
    console.log('err connecting', err)
})

module.exports.User = require("./user")

module.exports.Post = require("./post")