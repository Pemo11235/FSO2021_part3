const express = require('express')
const {route} = require("express/lib/router");
const {response} = require("express");
const {request} = require("express");
const app = express()

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


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})