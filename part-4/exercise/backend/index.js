const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error.message)
    })

const server = http.createServer(app)
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
