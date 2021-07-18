require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3700
require('./models/index')

//routes

const routes = require('./routes/index')

app.use(express.json())

app.use('/api/auth', routes.Auth)
app.use('/api/post', routes.Post)
app.use('/api/user', routes.User)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}


app.listen(port, () => {
    console.log(`Server is running in port: http://localhost:${port}`)
})