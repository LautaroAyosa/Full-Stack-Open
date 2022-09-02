import { useEffect, useState } from "react";
import blogService from "../../../services/blogs"
import loginService from "../../../services/login"
import Blog from "./Blog/Blog";

const BlogsList = (props) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
      }, []);

    return (
        <div>
            <h2>Blogs</h2>
            <p>
                {props.user.name} logged in 
                <button onClick={async() => await loginService.logout()}>Log out</button>
            </p>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    )
}

export default BlogsList