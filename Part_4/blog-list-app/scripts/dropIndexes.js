require('dotenv').config()
const mongoose = require('mongoose')
const Blog = require('../models/blog')

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { family: 4 })
  await Blog.collection.dropIndexes()
  console.log('indexes dropped')
  await mongoose.connection.close()
}

run()