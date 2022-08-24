const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('When there are initially some blogs saved', () => {
  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('All notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('A specific blog is within the returned notes', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('TDD harms architecture')
  })

  test("The unique identifying property of blog posts is called 'id' instead of '_id'", async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]).toHaveProperty('id')
  })
})

describe('Viewing a specific Blog', () => {
  test('Succeeds with a valid ID', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const resultBlog = await api
      .get(`/api/blogs/${blogsAtStart[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlog = JSON.parse(JSON.stringify(blogsAtStart[0]))

    expect(resultBlog.body).toEqual(processedBlog)
  })

  test('Fails with status code 400 if id is invalid', async () => {
    const invalidId = 'testid123'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('Adding a new Blog', () => {
  test('A valid blog can be added', async () => {
    const newBlog = {
      title: 'How to Use Stereo Cameras to See in 3D!',
      author: 'Andrew Blance',
      url: 'https://medium.com/better-programming/how-to-use-stereo-cameras-to-see-in-3d-8dfd955a1824',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(
      'How to Use Stereo Cameras to See in 3D!'
    )
  })

  test('Add likes=0 if the property likes is not passed', async () => {
    const newBlog = {
      title: 'How to Use Stereo Cameras to See in 3D!',
      author: 'Andrew Blance',
      url: 'https://medium.com/better-programming/how-to-use-stereo-cameras-to-see-in-3d-8dfd955a1824'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[helper.initialBlogs.length]).toHaveProperty('likes', 0)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(
      'How to Use Stereo Cameras to See in 3D!'
    )
  })

  test('Do not add blogs without a title', async () => {
    const blogWithoutTitle = {
      author: 'Andrew Blance',
      url: 'https://medium.com/better-programming/how-to-use-stereo-cameras-to-see-in-3d-8dfd955a1824',
      likes: 9
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('Do not add blogs without a URL', async () => {
    const blogWithoutURL = {
      title: 'How to Use Stereo Cameras to See in 3D!',
      author: 'Andrew Blance',
      likes: 9
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutURL)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Deletion of a blog', () => {
  test('Succeeds with a status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const contents = blogsAtEnd.map(blog => blog.content)

    expect(contents).not.toContain(blogToDelete)
  })

  test('Fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const invalidId = 'testid123'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
