require('dotenv').config()

const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (num) {
                return /^\d{2,3}-\d{5,}$/.test(num) && num.length >= 8
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next()
}

app.use(requestLogger)

app.use(morgan('tiny'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(
            `<p>Phonebook has info for ${persons.length} people(s)</p>
            <p>${new Date()}</p>`
        )
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(
            error => {
                next(error)
            }
        )
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number || null,
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number || null,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            console.log(updatedPerson)
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send(
        {
            error: 'unknown endpoint'
        }
    )
}

app.use(unknownEndpoint)

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

app.use(errorHandler)