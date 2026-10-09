import { useParams, useNavigate } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
import { Link, Button, Typography } from '@mui/material'

const BlogView = ({ blogs, onLike, handleDelete, user }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  // console.log('blog: ', blog)
  const navigate = useNavigate()

  const onDelete = async ( blog ) => {
    const wasDeleted = await handleDelete(blog)
    if (wasDeleted) navigate('/')
  }

  const style = {
    marginTop: '1.5em',
    gap: '2em',
    padding: 5,
  }

  const buttonStyle = {
    padding: 5,
    margin: 5,
  }

  const lineStyle = {
    padding: 5,
  }

  if (!blog) return <p>Loading...</p>
  else return (
    <div className='blog' style={style}>
      <Typography variant="h6" component="h2" href={blog.url} target="_blank" rel="noopener noreferrer" className="blog-title" style={{ paddingLeft: 5}} sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', color: 'white', }}>
        <strong className="blog-title">{blog.title}</strong>
      </Typography>
      <Typography variant="body1" className="blog-author" style={{ paddingLeft: 5}}>by {blog.author}</Typography>
      <Link href={blog.url} target="_blank" rel="noopener noreferrer" style={lineStyle}>{blog.url}</Link>
      <Typography style={lineStyle}>added by {blog.user ? blog.user.name : 'Unknown'}</Typography>
      <Typography variant="body1" style={{...lineStyle, display: 'inline-block'}}><span className="likes-count">{blog.likes}</span> likes&nbsp;</Typography>
      {user && <Button variant="outlined" onClick={() => onLike(blog)} style={buttonStyle}>like</Button> }
      {user && user.username === blog.user?.username && (
        <Button variant="outlined" color="error" onClick={() => onDelete(blog)} style={buttonStyle}>delete</Button>
      )}
    </div>
  )
}

export default BlogView