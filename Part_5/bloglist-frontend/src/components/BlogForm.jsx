import { useState } from 'react'

const BlogForm = ({ createEntry }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateEntry = event => {
    event.preventDefault()
    createEntry({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateEntry}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
              placeholder="Title"
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={author}
              onChange={event => setAuthor(event.target.value)}
              placeholder="Author"
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={url}
              onChange={event => setUrl(event.target.value)}
              placeholder="URL"
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm