require('dotenv').config()
const express = require('express')
const {route} = require("express/lib/router");
const {response} = require("express");
const {request} = require("express");
const morgan = require('morgan')
const {format, token} = require("morgan");
const cors = require('cors')
const app = express()
const Person = require('./models/person')
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`SERVER RUNNING ON ${PORT}`))
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
        Person.find({}).then(
            persons => response.json(persons)
        )
    }
)

// GET by id
app.get('/api/persons/:id',
    (request, response, next) => {
        Person
            .findById(request.params.id)
            .then(person => {
                if (person) {
                    response.json(person)
                } else {
                    response.status(404).end()
                }
            }).catch(error => next(error));
    }
)

//DELETE by id
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error))
})
//
// //GET info
// app.get('/info', (request, response) => {
//     const personsLength = persons.length;
//     const timestamp = new Date();
//     response.send(`<p>Phonebook has info for ${personsLength} people.</p>
// <p>${timestamp}</p>`)
//
// })


// POST
app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (body.name === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    // const isNameAlreadyIn = persons.find(person => person.name.includes(body.name))
    //
    // if (isNameAlreadyIn) {
    //     return response.status(409).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    // persons = persons.concat(person);

    person.save().then(res => {
        // console.log(`ADDED ${name} NUMBER ${number} TO PHONEBOOK`);
        response.json(res)
        // mongoose.connection.close()
    })
})

const errorHandler= (error, request, response, next) => {
    console.log(error.message)
    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformed id'})
    }
    next(error)
}
app.use(errorHandler)
