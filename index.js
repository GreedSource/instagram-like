require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT
const db = require('./models/index')
const bodyParser = require("body-parser")

//routes

const routes = require('./routes/index')

app.use(bodyParser.json())

app.use('/api/auth', routes.Auth)
app.use('/api/post', routes.Post)

app.listen(port, () => {
    console.log(`Server is running in port: ${port}`)
})