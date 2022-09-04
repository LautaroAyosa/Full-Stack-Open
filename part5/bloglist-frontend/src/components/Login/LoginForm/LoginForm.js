import {useState} from 'react'
import LoginButton from "./LoginButton/LoginButton"

const LoginForm = (props) => {
    const [user, setUser] = useState({ username: "", password: ""});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <form>
            <input placeholder='Username' onChange={handleInputChange} value={user.username} name='username' />
            <input placeholder='Password' onChange={handleInputChange} value={user.password} name='password' />
            <LoginButton user={user} setUser={setUser} setMessage={props.setMessage} />
        </form>
    )
}

export default LoginForm