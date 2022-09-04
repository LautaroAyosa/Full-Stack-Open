import loginService from "../../../services/login"
import Blog from "./Blog/Blog";

const BlogsList = (props) => {

    return (
        <div>
            <p>
                {props.user.name} logged in 
                <button onClick={async() => await loginService.logout()}>Log out</button>
            </p>
            {props.blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    )
}

export default BlogsList