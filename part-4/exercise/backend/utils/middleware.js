const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' + req.path })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        response.status(400).json({ error: error.message })
    } else {
        response.status(500).json({ error: 'Internal server error' })
    }

    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler
}
