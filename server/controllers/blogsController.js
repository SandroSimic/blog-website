import Blog from "../models/blogModel.js"
import asyncHandler from "../middleware/asyncHandler.js"
import fs from 'fs'

export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate('creator', 'username')

  if (blogs.length === 0) {
    return res.status(404).send("No Blogs found")
  }
  return res.status(200).send(blogs)
})

export const getBlogById = asyncHandler(async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id).populate('creator', 'username')
  console.log(blog)

  if (blog) {
    res.json(blog)
  } else {
    res.status(404)
    throw new Error("Resource not found")
  }
})

export const createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body
  const { originalname, path } = req.file
  const parts = originalname.split('.')
  const ext = parts[parts.length - 1]
  const newPath = path + "." + ext
  fs.renameSync(path, newPath)

  console.log(newPath)
  const blog = new Blog({ title, content, image: newPath, creator: req.user._id })
  console.log(blog)
  try {
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Validation failed', errors: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
})

export const updateBlog = (req, res) => {
  res.send("Update Blog")
}

export const deleteBlog = asyncHandler(async (req, res) => {
  const id = req.params.id

  await Blog.findByIdAndDelete(id)

  res.status(204).json({ message: "blog deleted" })
})
