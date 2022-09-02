import blogsService from '../../../../../services/blogs'

const CreateBlogsFormButton = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        await blogsService.createBlog({
            title: props.newBlog.title,
            author: props.newBlog.author,
            url: props.newBlog.url
        })
        props.setNewBlog({title:'', author: '', url: ''})
    }

    return (
        <button onClick={handleSubmit}>Create new blog</button>
    )
}

export default CreateBlogsFormButton