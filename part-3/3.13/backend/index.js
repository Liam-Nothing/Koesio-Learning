require('dotenv').config()

const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
// const Note = require('./models/person')
const app = express()


app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')

const password = process.argv[2]

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // delete returnedObject.name
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)

app.use((req, res, next) => {
    if (req.method === 'POST') {
        console.log('Request Body:', req.body);
    }
    next();
});

app.use(morgan('tiny'));

let persons = [
    {
        "id": uuidv4(),
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": uuidv4(),
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": uuidv4(),
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": uuidv4(),
        "name": "Mary Poppendieck",
        "number": "39-2323-6423122"
    }
]


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`
    )
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    // const id = Number(request.params.id)
    const id = request.params.id

    persons = persons.filter(person => person.id !== id)


    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
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

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})