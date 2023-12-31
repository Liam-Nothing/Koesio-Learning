const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, res, next) => {

    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }

    next()
}


const userExtractor = async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        request.user = await User.findById(decodedToken.id)

        if (!request.user) {
            return response.status(401).json({ error: 'user not found' })
        }

        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return response.status(401).json({ error: 'token expired' })
        } else {
            return response.status(401).json({ error: 'token invalid' })
        }
    }
}

module.exports = {
    tokenExtractor,
    userExtractor
}