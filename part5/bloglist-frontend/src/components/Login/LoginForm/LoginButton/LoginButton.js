import loginService from "../../../../services/login"
import blogService from '../../../../services/blogs'

const LoginButton = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({
                username: props.user.username,
                password: props.user.password
            })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            window.location.reload()
        } catch(err) {
            props.setMessage(`Error! Incorrect Username or Password`)
            props.setUser({username: '', password: ''})
        }
    }

    return (
        <button 
            type="submit" 
            onClick={handleSubmit}>
            Submit
        </button>
    )
}

export default LoginButton