import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { TextField, Button, Typography } from '@mui/material'

const CreateBlogForm = ({ user, createEntry }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const navigate = useNavigate()

  const handleCreateEntry = event => {
    event.preventDefault()
    createEntry({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
    navigate('/')
  }

  return (
    <div>
      { user && (
        <div className="blog-form">
          <Typography variant="h5" component="h2" sx={{mt: 3}}>Create new</Typography>
          <form onSubmit={handleCreateEntry}>
            <div>
              <TextField
                label="Title"
                style={{ marginTop: '1rem', display: 'block' }}
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              <TextField
                label="Author"
                style={{ marginTop: '1rem', display: 'block' }}
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              <TextField
                label="URL"
                style={{ marginTop: '1rem', display: 'block' }}
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <Button type="submit" variant="contained" style={{ marginTop: '1rem', display: 'block' }}>create</Button>
          </form>
        </div>
      )}
      {!user && (
        <Typography variant="body1" sx={{ mt: 2, marginLeft: 1 }}>You must be logged in to create an entry.</Typography>
      )}
    </div>
  )
}

export default CreateBlogForm