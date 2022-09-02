import { useState, useEffect } from 'react'
import Login from './components/Login/Login'
import BlogsList from './components/Blogs/BlogsList/BlogsList'
import CreateBlogs from './components/Blogs/CreateBlogs/CreateBlogs'

const App = () => {
  const [user, setUser] = useState(null)

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
      <CreateBlogs />
      <BlogsList user={user}/>
    </div>
  )
}

export default App
