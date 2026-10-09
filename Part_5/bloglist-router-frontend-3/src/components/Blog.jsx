import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const style = {
    gap: '2em',
    padding: 5
  }

  return (
    <li className="blog">
      <div>
        <Link style={style} to={`/blog/${blog.id}`}><strong className="blog-title">{blog.title}</strong></Link>
        &nbsp;&nbsp;&ndash;&nbsp;&nbsp;
        <span className="blog-author">{blog.author}</span>
      </div>
    </li>
  )
}

export default Blog