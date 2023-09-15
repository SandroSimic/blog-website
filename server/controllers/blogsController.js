import Blog from "../models/blogModel.js"
import asyncHandler from "../middleware/asyncHandler.js"

export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate('creator', 'username')
  console.log(blogs)
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
  console.log(req.file)

  const blog = new Blog({ title, content, image: req.file.path, creator: req.user._id, creatorImg: req.user.image })

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

export const updateBlog = asyncHandler(async (req, res) => {
  const id = req.params.id
  console.log(req.body)

  const { title, content } = req.body
  const updateData = {};

  if (title) {
    updateData.title = title
  }


  if (content) {
    updateData.content = content
  }

  if (req.file) {
    updateData.image = req.file.path
  }

  console.log("Update Data:", updateData);
  try {
    const blog = await Blog.findById(id)

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" })
    }

    if (blog.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You do not have permission to update this blog" })
    }

    if (title) {
      blog.title = title;
    }

    if (content) {
      blog.content = content;
    }

    if (req.file) {
      blog.image = req.file.path;
    }

    const updatedBlog = await blog.save()

    res.status(200).json(updatedBlog)

  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Validation failed", errors: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

})

export const deleteBlog = asyncHandler(async (req, res) => {
  const id = req.params.id

  await Blog.findByIdAndDelete(id)


  res.status(204).json({ message: "blog deleted" })
})
