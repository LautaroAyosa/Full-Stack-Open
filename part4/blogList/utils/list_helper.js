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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
