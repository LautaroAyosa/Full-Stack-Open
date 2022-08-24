const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs')
  res.status(200).json(users)
})

usersRouter.get('/:id', async (req, res) => {
  const user = await User
    .findById(req.params.id).populate('blogs')
  res.status(200).json(user)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!(username && password)) {
    return req.status(400).json({
      error: 'username and password are required'
    })
  }

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: 'username and password must be at least 3 characters long'
    })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id)
  if (!deletedUser) {
    res.status(400).send({ error: 'No user found with that ID' })
  } else {
    res.status(200).json(deletedUser)
  }
})

module.exports = usersRouter
