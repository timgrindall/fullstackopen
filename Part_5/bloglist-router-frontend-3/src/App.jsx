import './styles.css'
import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import Title from './components/Title'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Container } from '@mui/material'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(() => {
    const savedUser = window.localStorage.getItem('loggedBlogAppUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')

  const createEntry = async (blogEntry) => {
    try {
      console.log('creating entry...')

      const blog = await blogService.create(blogEntry)
      console.log(blog)
      setBlogs((prevBlogs) =>
        [...prevBlogs, blog].sort((a, b) => b.likes - a.likes)
      )
      setErrorMessage(`${blog.title} by ${blog.author} added`)
      setMessageType('success')
      console.log('entry created')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch {
      setErrorMessage('Error: Entry could not created')
      setMessageType('error')
      console.log('entry creation failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLike = async (blog) => {
    if (user) {
      try {
        const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) => (b.id === blog.id ? updatedBlog : b))
        )
        console.log(`Liked blog: ${updatedBlog.title} now has ${updatedBlog.likes} likes`)
      } catch (error) {
        console.error('Error liking the blog:', error)
      }
    } else {
      setErrorMessage('You must be logged in to like a blog')
      setMessageType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleDelete = async (blog) => {
    if (blog.user && user && blog.user.username === user.username) {
      if (window.confirm(`Are you sure you want to delete "${blog.title}" by ${blog.author}?`)) {
        try {
          await blogService.remove(blog.id)
          setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id))
          setErrorMessage(`Deleted blog: ${blog.title} by ${blog.author}`)
          setMessageType('success')
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          return true
        } catch (error) {
          console.error('Error deleting the blog:', error)
          setErrorMessage('Error: Entry could not be deleted')
          setMessageType('error')
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          return false
        }
      }
    } else if (user) {
      window.alert('You can only delete blogs you added yourself.')
      return false
      // I was using setErrorMessage here but it was not visible to the user when I had scrolled down a bit, so I switched to window.alert for better visibility.
    } else {
      window.alert('You must be logged in to delete blogs.')
      return false
    }
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const newUser = await loginService.login({ username, password })
      // console.log('login successful, user data received:')
      // console.log(newUser)
      setUser(newUser)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(newUser))

      setErrorMessage('login successful')
      setMessageType('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (error) {
      console.log(error)
      setErrorMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async () => {
    // event.preventDefault()
    console.log('logging out...')
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setErrorMessage('You have been logged out')
    setMessageType('success')
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
      console.log('user set in useEffect:')
      console.log(user)
    }
  }, [user])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
      console.log('blogs fetched and sorted:')
      console.log(sortedBlogs[0])
    })
  }, [])


  return (
    <Router>
      <Container maxWidth="md">
        <div>
          <Navigation user={user} handleLogout={handleLogout}/>
          {/* <Title /> */}
          <Notification message={errorMessage} type={messageType}/>
          <Routes>
            <Route path="/" element={
              <Blogs blogs={blogs} handleLike={handleLike} handleDelete={handleDelete} />
            } />
            <Route path="/login" element={
              !user && <LoginForm
                handleLogin={handleLogin}
              />
            } />
            <Route path="/blog/:id" element={
              <BlogView user={user} blogs={blogs} onLike={handleLike} handleDelete={handleDelete}/>
            } />
            <Route path="/create" element={
              <CreateBlogForm user={user} createEntry={createEntry} />
            } />
          </Routes>
        </div>
      </Container>
    </Router>
  )
}

export default App