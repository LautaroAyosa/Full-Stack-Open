const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const helper = require('./test_helper')
const config = require('../utils/config')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  let passwordHash = await bcrypt.hash('sekret', 10)
  let user = new User({ username: 'root', name: 'superuser', passwordHash })

  await user.save()

  passwordHash = await bcrypt.hash('anotherPassword', 10)
  user = new User({ username: 'LautaroAyosa', name: 'lautaroAyosa', passwordHash })

  await user.save()
})

describe('When there is initially one user in db', () => {
  test('Users are returned as a JSON', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('All users are returned', async () => {
    const users = await api.get('/api/users')
    expect(users.body).toHaveLength(2)
  })
})

describe('Adding a new User', () => {
  test('Succeeds with statuscode 201 with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('Fails with statuscode 400 and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Fails with status code 400 - Username has less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('Fails with status code 400 - Password has less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'shortPassword',
      name: 'Short Password User',
      password: 'sa'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })
})

describe('Deleting an User', () => {
  let token = null
  beforeEach(async () => {
    const user = {
      username: 'LautaroAyosa',
      password: 'anotherPassword'
    }
    token = await api
      .post('/api/login/')
      .send(user)
      .expect(200)

    token = 'bearer ' + token.stringify()
  })

  test('Delete user if Token is correct', async () => {
    const usersAtStart = helper.usersInDb()
    console.log(token)
    console.log(usersAtStart)
    // const decodedToken = jwt.verify(token, config.SECRET)
    // await api
    //   .delete(`/api/users/${userToDelete.id}`)
    //   .set('Authentication', `bearer ${token}`)

    // const usersAtEnd = helper.usersInDb
    // expect(usersAtStart).toHaveLength(usersAtEnd.length - 1)

  // const usernames = usersAtEnd.map(user => user.username)
  // expect(usernames).not.toContain(userToDelete.username)
  })

  // test('Fail with status code 401 if the token is invalid', async () => {
  //   token = null
  //   const usersAtStart = helper.usersInDb
  //   const userToDelete = User.find({ username: 'LautaroAyosa' })

  //   await api
  //     .delete(`/api/users/${userToDelete.id}`)
  //     .set('Authentication', `bearer ${token}`)
  //     .expect(401)

  //   const usersAtEnd = helper.usersInDb
  //   expect(usersAtStart).toHaveLength(usersAtEnd.lenght)

  //   const usernames = usersAtEnd.map(user => user.username)
  //   expect(usernames).toContain(userToDelete.username)
  // })
})

afterAll(() => {
  mongoose.connection.close()
})
