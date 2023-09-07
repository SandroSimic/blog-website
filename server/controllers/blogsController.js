import Blog from "../models/blogModel.js"
import asyncHandler from "../middleware/asyncHandler.js"

export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()

  if (blogs.length === 0) {
    res.status(404).send("No Blogs found")
  }
  res.status(200).send(blogs)
})

export const getBlogById = asyncHandler(async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)

  if (blog) {
    res.json(blog)
  } else {
    res.status(404)
    throw new Error("Resource not found")
  }
})

export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body
  const creator = req.user.userId
  const blog = new Blog({ title, content, image, creator })

  if (blog) {
    const createdBlog = await blog.save()

    res.status(202).send(createdBlog)
  } else {
    res.status(500)
    throw new Error("Something went")
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
