import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { describe } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

describe('BlogForm component', () => {
  test('calls the createEntry handler with the right details when a new blog is created', async () => {

    const mockCreateEntry = vi.fn()
    render(
      <MemoryRouter>
        <BlogForm createEntry={mockCreateEntry} />
      </MemoryRouter>
    )
    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('URL')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'Flickr Blog')
    await user.type(authorInput, 'Flickr')
    await user.type(urlInput, 'https://flickr.com')
    await user.click(createButton)

    expect(mockCreateEntry).toHaveBeenCalledWith({
      title: 'Flickr Blog',
      author: 'Flickr',
      url: 'https://flickr.com'
    })
  })
})