const blogsRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const {userExtractor} = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  
  // logger.info(blogs)
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  if (!ObjectId.isValid(id)) {
    return response.status(400).json({error: "Blog id missing or not valid"})
  }
  const blog = await Blog.findById(id).populate('user', { username: 1, name: 1})
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user //extracted by middleware from auth token

  // save the new blog with user id
  const blog = new Blog({...request.body, user: user._id})
  const savedBlog = await blog.save()

  //save the new blog to the user
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  // Populate user before returning
  await savedBlog.populate('user', { username: 1, name: 1 })
  response.status(201).json(savedBlog)
})

// TODO: need to delete blog id from list in user doc when deleting blog

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogId = request.params.id
  const user = request.user

  //retrieve blog and check ids
  const blog = await Blog.findById(blogId)
  if (!blog) {
    return response.status(400).json({error: "Blog id missing or not valid"})
  } // also check validity
  if (blog.user.toString() !== user.id) {
    return response.status(403).json({error: "not authorized"})
  }
  //if all is well, delete blog by id
  const deletedBlog = await blog.deleteOne()

  // delete blog from user before closing
  user.blogs = user.blogs.filter(b => b.toString() !== blogId)
  await user.save()

  // console.log(deletedBlog)
  response.status(204).end() // should prob be 204 for "no content"
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const { likes } = req.body
  console.log('PUT: id:', id, 'likes:', likes)

  const modifiedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes },
    { new: true }
  ).populate('user', {username: 1, name: 1 })
  // console.log('PUT: modified:', modifiedBlog)

  if (!modifiedBlog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  res.status(200).json(modifiedBlog)
})

module.exports = blogsRouter