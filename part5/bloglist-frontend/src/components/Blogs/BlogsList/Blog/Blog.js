import Togglable from "../../../Togglable/Togglable"

const Blog = ({blog}) => (
  <div className="singleBlog">
    <p className="singleBlogItem title"><strong>{blog.title}</strong> by {blog.author}</p>
    <Togglable 
      buttonLabel='Show' 
      hideLabel='Hide' 
      className='singleBlogTogglable'
      showDivClassName='singleBlogShowButton'
      contentDivClassName='singleBlogContent'
    >
      <p className="singleBlogItem url">{blog.url}</p>
      <p className="singleBlogItem likes">
        {blog.likes}
        <button>Like</button>
      </p>
    </Togglable>
  </div>  
)

export default Blog