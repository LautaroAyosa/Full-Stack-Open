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

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body
  const token = req.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  }).populate('user', { username: 1, name: 1 })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
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

  const blogToDelete = await Blog.find({ user: user._id, _id: req.params.id })
  if (blogToDelete) {
    const blog = await Blog.deleteOne({ user: user._id, _id: req.params.id })
    res.status(204).json(blog)
  } else {
    res.status(400).send({ Error: 'Invalid ID' })
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
