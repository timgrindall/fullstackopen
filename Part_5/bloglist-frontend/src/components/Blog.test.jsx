import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe } from 'vitest'


describe('Blog component', () => {
  test('renders title and author but not url or likes by default', () => {
    const blog = {
      title: 'Flickr Blog',
      author: 'Flickr',
      url: 'https://flickr.com',
      likes: 1000
    }

    render(<Blog blog={blog} />)

    expect(screen.getByText('Flickr Blog')).toBeDefined()
    expect(screen.getByText('Flickr')).toBeDefined()

    expect(screen.queryByText('https://flickr.com')).toBeNull()
    expect(screen.queryByText('1000 likes')).toBeNull()
  })

  test('renders the entire blog entry when expanded', () => {
    const blog = {
      title: 'Flickr Blog',
      author: 'Flickr',
      url: 'https://flickr.com',
      likes: 1000
    }

    render(<Blog blog={blog} isExpanded={true}/>)

    expect(screen.getByText('Flickr Blog')).toBeDefined()
    expect(screen.getByText('Flickr')).toBeDefined()

    expect(screen.getByText('https://flickr.com')).toBeDefined()
    expect(screen.getByText('1000 likes')).toBeDefined()

    expect(screen.getByText('delete')).toBeDefined()
  })

  test('calls the like handler twice when the like button is clicked twice', async () => {

    const blog = {
      title: 'Flickr Blog',
      author: 'Flickr',
      url: 'https://flickr.com',
      likes: 1000
    }

    const mockLikeHandler = vi.fn()
    render(<Blog blog={blog} isExpanded={true} onLike={mockLikeHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })

  test('calls the delete handler with correct details when the delete button is clicked', async () => {

    const blog = {
      'title': 'Pro Lost',
      'author': 'Stu Maschwitz',
      'url': 'https://prolost.com',
      'likes': 305,
      'user': {
        'username': 'jgrindog',
        'name': 'Jono Grindall',
        'id': '69fa562ee291e88f7f7705bb'
      },
      'id': '69febf9c806e0c073cf491f1'
    }

    const mockDeleteHandler = vi.fn()
    render(<Blog blog={blog} isExpanded={true} onDelete={mockDeleteHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('delete')
    await user.click(button)

    expect(mockDeleteHandler).toHaveBeenCalledWith(blog)
  })
})