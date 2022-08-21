const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
const Person = require('./models/person')

const morgan = require('morgan')
morgan.token('data', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : ' '
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

// app.get('/api/persons/:id', (req, res) => {
//   const id = Number(req.params.id)
//   const person = persons.find(person => person.id === id)
//   if (person) {
//     res.json(person)
//   } else {
//     res.status(404).send('Error! The ID wasn\'t valid or we couldn\'t find the person')
//   }
// })

// app.get('/info', (req, res) => {
//   const reqDate = new Date().toString()
//   res.send(`<p>Phonebook has infor for ${persons.length} people</p><p>${reqDate}</p>`)
//   res.status(404).send({ error: 'unknown endpoint' })
// })

// app.delete('/api/persons/:id', (req, res) => {
//   const id = Number(req.params.id)
//   const personsList = persons.filter(person => person.id !== id)
//   res.send('DELETE req Called')
//   res.status(200).json(personsList)
// })

// app.post('/api/persons', (req, res) => {
//   const { name, number } = req.body
//   const id = Math.round(Math.random() * 60000)

//   if (name === undefined || number === undefined) {
//     res.status(404).send({ error: 'The Name or the Number is Undefined' })
//   } else if (persons.find(person => person.name === name)) {
//     res.status(404).send({ error: 'The person is already in the PhoneBook' })
//   } else {
//     const newPerson = {
//       name,
//       number,
//       id
//     }

//     persons = [...persons, newPerson]
//     res.json({ newPerson })
//   }
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, (err) => {
  if (err) console.log(err)
  console.log(`Server running on port ${PORT}`)
})
