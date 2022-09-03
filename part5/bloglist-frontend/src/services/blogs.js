import axios from 'axios'
const baseUrl = '/api/blogs'

let token = '';

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config )
  return response.data
}

// eslint-disable-next-line
export default { getAll, createBlog, setToken }