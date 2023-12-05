const express = require('express')
const cors = require('cors')
const requestLogger = require('./utils/requestLogger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
    app.use(requestLogger)
}

app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
