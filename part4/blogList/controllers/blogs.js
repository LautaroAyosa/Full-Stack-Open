const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const token = req.token
  const user = req.user

  if (!token || !user) {
    return res.status(401).json({ error: 'token missing or invalid' })
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

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token
  const user = req.user

  if (!token || !user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  if (!user.blogs) {
    res.status(404).send({ Error: 'This user does not own any blogs' })
  }

  const blogToDelete = await Blog.findById(req.params.id)
  if (!blogToDelete) {
    res.status(404).send({ error: 'that blog does not exist' })
  }
  if (blogToDelete.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: req.params.id })
    res.status(204).end()
  } else {
    res.status(401).send({ Error: 'This blog does not belong to that user' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const token = req.token
  const user = req.user
  const { title, author, url, likes } = req.body

  if (!token || !user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  if (!user.blogs) {
    res.status(404).send({ Error: 'This user does not own any blogs' })
  }

  const blogToUpdate = await Blog.findById(req.params.id)
  await Blog.updateOne(blogToUpdate, {
    title,
    author,
    url,
    likes
  })
  res.status(204).end()
})

module.exports = blogsRouter
