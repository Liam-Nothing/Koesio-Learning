const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');

const app = express()

app.use(cors())
app.use(express.json())

// morgan.token('body', (req) => JSON.stringify(req.body))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

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


const PORT = 3001
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
    response.send(persons)
})

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const persons_target = persons.find(person => person.id === id)

    if (persons_target) {
        response.json(persons_target)
    } else {
        response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

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

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number || null,
        id: uuidv4(),
    }

    persons = persons.concat(person)

    response.json(person)
})