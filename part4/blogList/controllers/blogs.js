const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.title && blog.url) {
    if (blog.likes) {
      const result = await blog.save()
      response.status(201).json(result)
    } else {
      blog.likes = 0
      const result = await blog.save()
      response.status(201).json(result)
    }
  } else {
    response.status(400).send({ error: 'No Title or URL' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).json(blog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = await Blog.findByIdAndUpdate(
    request.params.id, {
      title,
      author,
      url,
      likes
    })
  response.send(`Blog '${blog.title}' has been updated`)
})

module.exports = blogsRouter
