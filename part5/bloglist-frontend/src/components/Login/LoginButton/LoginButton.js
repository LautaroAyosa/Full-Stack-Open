import loginService from "../../../services/login"

const LoginButton = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await loginService.login({
            username: props.username, 
            password: props.password
        })
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        window.location.reload()
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