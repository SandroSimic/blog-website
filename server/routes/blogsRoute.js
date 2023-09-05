import express from "express"
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blogsController.js"

const router = express.Router()

router.route("/").get(getAllBlogs).post(createBlog)
router.route("/:id").get(getBlogById).patch(updateBlog).delete(deleteBlog)

export default router