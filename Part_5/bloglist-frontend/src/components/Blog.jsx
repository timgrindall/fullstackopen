const Blog = ({ blog, isExpanded, onToggle, onLike, onDelete, user }) => {
  const buttonText = isExpanded ? 'hide' : 'view'

  return (
    <li className="blog">
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer" className="blog-title-link">
          <strong className="blog-title">{blog.title}</strong>
        </a>
        &nbsp;&nbsp;&ndash;&nbsp;&nbsp;
        <span className="blog-author">{blog.author}</span>
        &nbsp;
        <button onClick={onToggle}>{buttonText}</button>
      </div>
      {isExpanded && (
        <div className="blog-details">
          <p><span className="likes-count">{blog.likes}</span> likes&nbsp;<button onClick={() => onLike(blog)}>like</button></p>
          <p>{blog.url}</p>
          <p>added by {blog.user ? blog.user.name : 'Unknown'}</p>
          {user && user.username === blog.user?.username && (
            <button onClick={() => onDelete(blog)}>delete</button>
          )}
        </div>
      )}
    </li>
  )
}

export default Blog