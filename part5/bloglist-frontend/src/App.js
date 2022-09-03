import { useState, useEffect } from 'react'
import blogService from "./services/blogs"
import Login from './components/Login/Login'
import BlogsList from './components/Blogs/BlogsList/BlogsList'
import CreateBlogs from './components/Blogs/CreateBlogs/CreateBlogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  if ( user === null ) {
    return <Login />
  }

  return (
    <div>
      <CreateBlogs blogs={blogs} setBlogs={setBlogs} />
      <BlogsList user={user} blogs={blogs}/>
    </div>
  )
}

export default App
