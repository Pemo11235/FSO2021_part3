const express = require('express')
const {route} = require("express/lib/router");
const {response} = require("express");
const {request} = require("express");
const morgan = require('morgan')
const {format, token} = require("morgan");
const cors = require('cors')
const app = express()

//mongodb+srv://admin:<fso2021>@cluster0.xmxno.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

morgan.token('body', (req, res) => (JSON.stringify(req.body)))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

let persons = [
    {
        "name": "Arto Hellas",
        "number": "123",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

// Hello world
app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

// GET all
app.get('/api/persons',
    (request, response) => {
        response.json(persons)
    }
)

// GET by id
app.get('/api/persons/:id',
    (request, response) => {
        const id = Number(request.params.id)
        const person = persons.find(person => person.id === id)

        if (person) {
            response.json(person)
        } else {
            response.status(404).end();
        }
    }
)

//DELETE by id
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

//GET info
app.get('/info', (request, response) => {
    const personsLength = persons.length;
    const timestamp = new Date();
    response.send(`<p>Phonebook has info for ${personsLength} people.</p> 
<p>${timestamp}</p>`)

})

const randomID = () => {
    return Math.floor(Math.random() * 1000)
}
// POST
app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const isNameAlreadyIn = persons.find(person => person.name.includes(body.name))

    if (isNameAlreadyIn) {
        return response.status(409).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: randomID()
    }

    persons = persons.concat(person);

    response.json(person)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})