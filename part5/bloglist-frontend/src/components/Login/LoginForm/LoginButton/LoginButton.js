import loginService from "../../../../services/login"

const LoginButton = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await loginService.login({
            username: props.user.username,
            password: props.user.password
        })
        
        if (user) {
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