import {useState} from 'react'
import CreateBlogsFormButton from "./CreateBlogsFormButton/CreateBlogsFormButton"

const CreateBlogsForm = () => {
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
            <CreateBlogsFormButton newBlog={newBlog} setNewBlog={setNewBlog} />
        </form>
    )
}

export default CreateBlogsForm