import Blog from './Blog'

const Blogs = ({ blogs }) => {

  return (
    <div style={{ marginTop: '1.5em' }}>
      <ul className="blog-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </ul>
    </div>
  )
}

export default Blogs