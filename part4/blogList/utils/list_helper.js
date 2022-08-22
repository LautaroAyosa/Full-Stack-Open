const { orderBy } = require('lodash')
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => {
    likes += blog.likes
  })
  return likes
}

const favoriteBlog = (blogs) => {
  let likes = 0
  let title = ''
  blogs.forEach(blog => {
    if (blog.likes >= likes) {
      likes = blog.likes
      title = blog.title
    }
  })
  return blogs.filter(blog => blog.title === title)
}

const mostBlogs = (blogs) => {
  const result = _.countBy(blogs, 'author')
  const mostBlogsAuthor = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b)
  const authorBlogCount = result[mostBlogsAuthor]

  return {
    author: mostBlogsAuthor,
    blogs: authorBlogCount
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likesCount = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes')
    }))
    .value()

  return likesCount.reduce((a, b) => {
    return a.likes > b.likes ? a : b
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
