const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const app = express()

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.info('connected to MongoDB')
    })
    .catch((error) => {
        console.error('error connecting to MongoDB:', error.message)
    })


app.use(cors())
app.use(express.json())

app.use('/', blogsRouter)

module.exports = app
