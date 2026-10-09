import { render, screen } from '@testing-library/react'
import BlogView from './BlogView'
import { describe, expect } from 'vitest'
import { MemoryRouter, Route, Routes, Router } from 'react-router-dom'
import testBlogs from '../data/blogs.json'

describe('Blog View component', () => {
  test('information and the number of likes are displayed to unauthenticated users, buttons are not displayed', () => {
    const blog = testBlogs[0]


    render(
      <MemoryRouter initialEntries={[`/blog/${blog.id}`]}>
        <Routes>
          <Route path="/blog/:id" element={<BlogView blogs={testBlogs}/>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(blog.title)).toBeDefined()
    expect(screen.getByText(blog.author)).toBeDefined()
    expect(screen.getByText(blog.url)).toBeDefined()
    expect(screen.getByText(`added by ${blog.user.name}`)).toBeDefined()
    expect(screen.getByText((content, element) => {
      return element.tagName === 'P' && element.textContent.includes(`${blog.likes} likes`)
    })).toBeDefined()

    expect(screen.queryByText('like')).toBeNull() //like button not shown
    expect(screen.queryByText('delete')).toBeNull() // delete button not shown
  })

  test('Authenticated users who are not the blog’s creator are shown only the like button', () => {
    //login user
    const testUser = {
      username: 'dangrgr',
      name: 'Dan Grindall'
    }


    const blog = testBlogs[0]

    render(
      <MemoryRouter initialEntries={[`/blog/${blog.id}`]}>
        <Routes>
          <Route path="/blog/:id" element={<BlogView blogs={testBlogs} user={testUser}/>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(blog.title)).toBeDefined()
    expect(screen.getByText(blog.author)).toBeDefined()
    expect(screen.getByText(blog.url)).toBeDefined()
    expect(screen.getByText(`added by ${blog.user.name}`)).toBeDefined()
    expect(screen.getByText((content, element) => {
      return element.tagName === 'P' && element.textContent.includes(`${blog.likes} likes`)
    })).toBeDefined()

    expect(screen.queryByText('like')).toBeDefined() // like button shown
    expect(screen.queryByText('delete')).toBeNull() // delete button not shown
  })

  test('The blog\'s creator is also shown the delete button', () => {
    //login user
    const testUser = {
      username: 'merelytimo',
      name: 'Tim Grindall'
    }


    const blog = testBlogs[2] // third element

    render(
      <MemoryRouter initialEntries={[`/blog/${blog.id}`]}>
        <Routes>
          <Route path="/blog/:id" element={<BlogView blogs={testBlogs} user={testUser}/>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(blog.title)).toBeDefined()
    expect(screen.getByText(blog.author)).toBeDefined()
    expect(screen.getByText(blog.url)).toBeDefined()
    expect(screen.getByText(`added by ${blog.user.name}`)).toBeDefined()
    expect(screen.getByText((content, element) => {
      return element.tagName === 'P' && element.textContent.includes(`${blog.likes} likes`)
    })).toBeDefined()

    expect(screen.queryByText('like')).toBeDefined() // like button shown
    expect(screen.queryByText('delete')).toBeDefined() // delete button is shown
  })
})