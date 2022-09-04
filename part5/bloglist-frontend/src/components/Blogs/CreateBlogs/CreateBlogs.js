import CreateBlogsForm from './CreateBlogsForm/CreateBlogsForm'

const CreateBlogs = (props) => {

    return (
        <div>
            <h2>Create New</h2>
            <CreateBlogsForm setMessage={props.setMessage} blogs={props.blogs} setBlogs={props.setBlogs} />
        </div>
    )
}

export default CreateBlogs