const express = require('express')
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

app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

app.get('/api/persons',
    (request, response) => {
        response.json(persons)
    }
)

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