const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

// Person routes
app.use('/', personsRouter)

// Middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
