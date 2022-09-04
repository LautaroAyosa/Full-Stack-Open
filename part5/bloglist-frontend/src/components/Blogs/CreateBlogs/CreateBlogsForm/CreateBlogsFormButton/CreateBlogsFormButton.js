import blogsService from '../../../../../services/blogs'

const CreateBlogsFormButton = (props) => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await blogsService.setToken(JSON.parse(window.localStorage.getItem('loggedUser')).token)
            const addedBlog = await blogsService.createBlog({
                title: props.newBlog.title,
                author: props.newBlog.author,
                url: props.newBlog.url
            })
            props.setBlogs(props.blogs.concat(addedBlog))
            props.setMessage(`New blog ${props.newBlog.title}, successfully created`)
            props.setNewBlog({title:'', author: '', url: ''})
        } catch (err) {
            props.setMessage(`Error! ${err.response.data.error}`)
        }
    }

    return (
        <button onClick={handleSubmit}>Create new blog</button>
    )
}

export default CreateBlogsFormButton