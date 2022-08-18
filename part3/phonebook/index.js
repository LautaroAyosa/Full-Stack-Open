const { default: axios } = require('axios');
const express = require('express');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

const app = express()

app.use(morgan(':method :url :status - :req[content-length] - :response-time ms :body'));
morgan.token('host', function(req, res) {
    return req.hostname;
});
morgan.token('body', (req, res) => JSON.stringify(req.body));
morgan.token('param', function(req, res, param) {
    return req.params[param];
});


let persons = [
    {
    "name": "Arto Hellas",
    "number": "040-123456",
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

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    let personId = req.params.id - 1;
    if (persons[personId]) res.status(200).send(persons[personId])
    else res.status(404).send('Error: Could not find that Person!' )
})

app.get('/info', (req, res) => {
    var reqDate = new Date().toString();
    res.send(`<p>Phonebook has infor for ${persons.length} people</p><p>${reqDate}</p>`)
    res.status(404).send({ error: 'unknown endpoint' })
})

app.post('/api/persons', (req, res) => {
    res.json(req)
})

app.delete('/api/persons/:id', (req, res) => {
    var index = persons.findIndex((o) => {
        return o.id === req.params.id;
    })
    if (index !== -1) {
        persons.splice(index, 1);
        res.send("DELETE req Called")
    } else res.status(404).send('Error: Could not find that Person!' )
})


const PORT = 3001
app.listen(PORT, (err) => {
    if (err) console.log(err)
    console.log(`Server running on port ${PORT}`)
})