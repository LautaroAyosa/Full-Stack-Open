import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
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

  test('Blog DOESN\'T show likes and url before show button is pressed', () => {
    const component = render(
          <Blog blog={blog} />
    )

    const title = component.container.querySelector('.title strong')
    const author = component.container.querySelector('.title')
    const likes = component.container.querySelector('.likes')
    const url = component.container.querySelector('.url')

    expect(title).toHaveTextContent('Some Test Blog')
    expect(author).toHaveTextContent('Franco Poggio')
    expect(likes).toBe(null)
    expect(url).toBe(null)
  })

  test('Blog DOES show likes and url after show button is pressed', () => {
    const component = render(
            <Blog blog={blog} />
    )

    const showButton = component.getByText('show')
    fireEvent.click(showButton)

    const title = component.container.querySelector('.title strong')
    const author = component.container.querySelector('.title')
    const likes = component.container.querySelector('.likes')
    const url = component.container.querySelector('.url')

    expect(title).toHaveTextContent('Some Test Blog')
    expect(author).toHaveTextContent('Franco Poggio')
    expect(likes).toHaveTextContent('Likes: 9')
    expect(url).toHaveTextContent('URL:')
  })
})
