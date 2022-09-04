import LoginForm from './LoginForm/LoginForm'

const Login = (props) => {

    return (
        <div>
            <h2>Log in to application</h2>
            <LoginForm setMessage={props.setMessage} />
        </div>
    )
}

export default Login