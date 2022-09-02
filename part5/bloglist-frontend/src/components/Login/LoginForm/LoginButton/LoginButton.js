import loginService from "../../../../services/login"
import blogsService from "../../../../services/blogs"

const LoginButton = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await loginService.login({
            username: props.user.username,
            password: props.user.password
        })
        
        if (user) {
            blogsService.setToken(user.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            window.location.reload()
        } else {
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