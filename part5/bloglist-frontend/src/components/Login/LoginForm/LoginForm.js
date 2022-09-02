import {useState} from 'react'
import LoginButton from "../LoginButton/LoginButton"

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form>
            <input placeholder='Username' onChange={({ target }) => setUsername(target.value)} value={username} />
            <input placeholder='Password' onChange={({ target }) => setPassword(target.value)} value={password} />
            <LoginButton username={username} password={password}/>
        </form>
    )
}

export default LoginForm