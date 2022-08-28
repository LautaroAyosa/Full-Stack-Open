const config = require('../utils/config')
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const user = request.user

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  }).populate('user', { username: 1, name: 1 })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user.blogs) {
    res.status(404).send({ Error: 'This user does not own any blogs' })
  }

  const blogToDelete = await Blog.findById(req.params.id)
  if (blogToDelete.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: req.params.id })
    res.status(204).end()
  } else {
    res.status(401).send({ Error: 'This blog does not belong to that user' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body
  const blog = await Blog.findByIdAndUpdate(
    req.params.id, {
      title,
      author,
      url,
      likes
    })
  res.send(`Blog '${blog.title}' has been updated`)
})

module.exports = blogsRouter
