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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
