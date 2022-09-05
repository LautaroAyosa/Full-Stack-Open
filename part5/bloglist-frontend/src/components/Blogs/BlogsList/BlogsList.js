import loginService from "../../../services/login"
import Blog from "./Blog/Blog";

const BlogsList = (props) => {

    return (
        <div>
            <p>
                {props.user.name} logged in 
                <button onClick={async() => await loginService.logout()}>Log out</button>
            </p>
            {props.blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog => (
                    <Blog 
                        key={blog.id} 
                        blog={blog} 
                        setBlogs={props.setBlogs}
                        setMessage={props.setMessage}
                    />
                ))
            }
        </div>
    )
}

export default BlogsList