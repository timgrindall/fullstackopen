import './styles.css'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(() => {
    const savedUser = window.localStorage.getItem('loggedBlogAppUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')
  const [expandedBlogIds, setExpandedBlogIds] = useState([])

  const blogFormRef = useRef()

  const toggleBlog = (id) => {
    setExpandedBlogIds((prev) =>
      prev.includes(id) ? prev.filter((blogId) => blogId !== id) : [...prev, id]
    )
  }

  const collapseAll = () => {
    setExpandedBlogIds([])
  }

  const createEntry = async (blogEntry) => {

    try {
      console.log('creating entry...')
      // blogFormRef.current.toggleVisibility()

      const blog = await blogService.create(blogEntry)
      console.log(blog)
      setBlogs((prevBlogs) =>
        [...prevBlogs, blog].sort((a, b) => b.likes - a.likes)
      )
      // if (user) blogFormRef.current.toggleVisibility()
      setErrorMessage(`${blog.title} by ${blog.author} added`)
      setMessageType('message')
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
    try {
      const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === blog.id ? updatedBlog : b))
      )
      console.log(`Liked blog: ${updatedBlog.title} now has ${updatedBlog.likes} likes`)
    } catch (error) {
      console.error('Error liking the blog:', error)
    }
  }

  const handleDelete = async (blog) => {
    if (blog.user && user && blog.user.username === user.username) {
      if (window.confirm(`Are you sure you want to delete "${blog.title}" by ${blog.author}?`)) {
        try {
          await blogService.remove(blog.id)
          setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id))
          setErrorMessage(`Deleted blog: ${blog.title} by ${blog.author}`)
          setMessageType('message')
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        } catch (error) {
          console.error('Error deleting the blog:', error)
          setErrorMessage('Error: Entry could not be deleted')
          setMessageType('error')
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        }
      }
    } else if (user) {
      window.alert('You can only delete blogs you added yourself.')
      // I was using setErrorMessage here but it was not visible to the user when I had scrolled down a bit, so I switched to window.alert for better visibility.
    } else {
      window.alert('You must be logged in to delete blogs.')
    }
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const newUser = await loginService.login({ username, password })
      // console.log('login successful, user data received:')
      // console.log(newUser)
      setUser(newUser)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(newUser))

      setUsername('')
      setPassword('')
      setErrorMessage('login successful')
      setMessageType('message')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (error) {
      console.log(error)
      setErrorMessage('wrong username or password')
      setUsername('')
      setPassword('')
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
    setErrorMessage(null)
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
    <div>
      <h1 className="quicksand-title">Pala Pala Blogs</h1>
      <Notification message={errorMessage} type={messageType}/>
      {user ? <p>{user.name} logged in &nbsp;<button onClick={handleLogout}>logout</button></p> : null}
      { !user &&
          <LoginForm
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
            username={username}
            password={password}
          />
      }

      { user && (
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm
            createEntry={createEntry}
          />
        </Togglable>
      )}

      <div style={{ marginTop: '1.5em' }}>
        { expandedBlogIds.length > 0 && (
          <button onClick={collapseAll} style={{ marginBottom: '1rem' }}>
              Collapse all
          </button>
        )}
        <ul className="blog-list">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              isExpanded={expandedBlogIds.includes(blog.id)}
              onToggle={() => toggleBlog(blog.id)}
              onLike={handleLike}
              onDelete={handleDelete}
              user={user}
            />
          ))}
        </ul>
      </div>
    </div>



  )
}

export default App