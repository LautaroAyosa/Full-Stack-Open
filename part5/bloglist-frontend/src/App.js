import { useState, useEffect } from 'react'
import blogService from "./services/blogs"
import Login from './components/Login/Login'
import BlogsList from './components/Blogs/BlogsList/BlogsList'
import CreateBlogs from './components/Blogs/CreateBlogs/CreateBlogs'
import Notification from './components/Notification/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [ message, setMessage ] = useState(null);

  useEffect(() => {
      blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])

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
      <Notification message={message}/>
      <CreateBlogs blogs={blogs} setBlogs={setBlogs} message={message} setMessage={setMessage} />
      <BlogsList user={user} blogs={blogs}/>
    </div>
  )
}

export default App
