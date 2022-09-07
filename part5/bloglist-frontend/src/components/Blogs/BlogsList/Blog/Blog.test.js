import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('BLOG CONTENT', () => {
  const blog = {
    title: 'Some Test Blog',
    author: 'Franco Poggio',
    url: 'https://exampleBlog.com/SomeTestBlog',
    likes: 9,
    user: {
      id: 'asdklahdjljahf',
      username: 'LautaroAyosa',
      name: 'Lautaro Ayosa'
    }
  }

  let component
  const showMockHandler = jest.fn()
  const likeMockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} toggleVisibility={showMockHandler} handleLikeButton={likeMockHandler} />
    )
  })

  test('Blog DOESN\'T render likes and url before show button is pressed', () => {
    expect(component.container.querySelector('.title strong')).toHaveTextContent(blog.title)
    expect(component.container.querySelector('.title')).toHaveTextContent(blog.author)
    expect(component.container.querySelector('.likes')).toBe(null)
    expect(component.container.querySelector('.url')).toBe(null)
  })

  test('At start Single Blog Content is not rendered', () => {
    const div = component.container.querySelector('.singleBlogContent')
    expect(div).toBe(null)
  })

  test('click event on "show" button ONCE and SHOW Single Blog Content', () => {
    const showButton = component.container.querySelector('#view-btn')
    fireEvent.click(showButton)
    const singleContent = component.container.querySelector('.singleBlogContent')
    expect(singleContent).toBeInTheDocument()
  })
  test('click event on "show" button TWICE and HIDE Single Blog Content', () => {
    const showButton = component.container.querySelector('#view-btn')
    fireEvent.click(showButton)
    fireEvent.click(showButton)

    const singleContent = component.container.querySelector('.singleBlogContent')
    expect(singleContent).not.toBeInTheDocument()
  })

  //   test('click on like button', () => {
  //     const showButton = component.container.querySelector('#view-btn')
  //     fireEvent.click(showButton)
  //     expect(component.container.querySelector('.likes')).toHaveTextContent(`Likes: ${blog.likes}`)

//     const likeButton = component.container.querySelector('#singleBlogItemLikeButton')
//     fireEvent.click(likeButton)
//     expect(component.container.querySelector('.likes')).toHaveTextContent(`Likes: ${blog.likes + 1}`)
//     fireEvent.click(likeButton)
//     expect(component.container.querySelector('.likes')).toHaveTextContent(`Likes: ${blog.likes + 2}`)
//   })
})
