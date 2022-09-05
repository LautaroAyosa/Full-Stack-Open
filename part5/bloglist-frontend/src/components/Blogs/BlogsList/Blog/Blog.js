import { useState } from 'react';
import blogService from '../../../../services/blogs'

const Blog = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeButton = async (e) => {
    e.preventDefault()
    await blogService.setToken(JSON.parse(window.localStorage.getItem('loggedUser')).token)
    await blogService.update(props.blog.id, {likes: props.blog.likes + 1})
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      await blogService.setToken(JSON.parse(window.localStorage.getItem('loggedUser')).token)
      await blogService.remove(props.blog.id)
      props.setMessage(`${props.blog.title} deleted successfuly`)
    } catch (err) {
      props.setMessage(`Error! ${err.response.data.Error}`)
      console.log(err.response.data.Error)
    }
  }

  return (
    <div className="singleBlogContainer">
      <div className='singleBlogHeader'>
        <p className="singleBlogItem title"><strong>{props.blog.title}</strong> by {props.blog.author}</p>
        <button id="view-btn" onClick={toggleVisibility}>
            {visible ? "hide" : "show"}
        </button>
      </div>
      {visible && ( 
      <div className='singleBlogContent'>
        <p className="singleBlogItem url">URL: {props.blog.url}</p>
        <p className="singleBlogItem likes">
          Likes: {props.blog.likes}
          <button onClick={handleLikeButton}>Like</button>
        </p>
        <p className="singleBlogItem remove">
          <button onClick={handleDelete}>Remove</button>
        </p>
      </div>
      )}
    </div>
  )
}

export default Blog