import {useState} from 'react'
import CreateBlogsFormButton from "./CreateBlogsFormButton/CreateBlogsFormButton"

const CreateBlogsForm = (props) => {
    const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewBlog({ ...newBlog, [name]: value });
    };

    return (
        <form>
            <input placeholder="Title" onChange={handleInputChange} value={newBlog.title} name='title' />
            <input placeholder="Author" onChange={handleInputChange} value={newBlog.author} name='author' />
            <input placeholder="URL" onChange={handleInputChange} value={newBlog.url} name='url'/>
            <CreateBlogsFormButton newBlog={newBlog} setNewBlog={setNewBlog} setMessage={props.setMessage} blogs={props.blogs} setBlogs={props.setBlogs} />
        </form>
    )
}

export default CreateBlogsForm