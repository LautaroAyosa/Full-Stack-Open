import { useState, useEffect } from 'react'
import Login from './components/Login/Login'
import Blogs from './components/Blogs/Blogs'

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
      <Blogs user={user}/>
    </div>
  )
}

export default App
