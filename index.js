require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT
const db = require('./models/index')

//routes

const routes = require('./routes/index')

app.use(express.json())

app.use('/api/auth', routes.Auth)
app.use('/api/post', routes.Post)
app.use('/api/user', routes.User)

app.listen(port, () => {
    console.log(`Server is running in port: ${port}`)
})