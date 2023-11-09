const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()

app.use(express.json())

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

app.get('/api/persons', (request, response) => {
    response.send(persons)
})

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

    const person = {
        name: body.name,
        number: body.number || null,
        id: uuidv4(),
    }

    persons = persons.concat(person)

    response.json(person)
})