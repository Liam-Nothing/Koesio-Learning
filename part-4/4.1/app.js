const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const app = express()
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next()
}

app.use(requestLogger)

app.use(cors())
app.use(express.json())

app.use('/', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
