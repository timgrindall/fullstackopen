import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { describe } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

describe('Blog component', () => {
  const blog = {
    id: '69febf9c806e0c073cf491f1',
    title: 'Flickr Blog',
    author: 'Flickr',
    url: 'https://flickr.com',
    likes: 1000
  }

  test('renders title and author', () => {
    render(
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>
    )

    expect(screen.getByText('Flickr Blog')).toBeDefined()
    expect(screen.getByText('Flickr')).toBeDefined()
  })

  test('does not render url or likes', () => {
    render(
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>
    )

    expect(screen.queryByText('https://flickr.com')).toBeNull()
    expect(screen.queryByText('1000')).toBeNull()
  })
})