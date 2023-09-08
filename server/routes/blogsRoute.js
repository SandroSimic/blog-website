import express from "express"
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blogsController.js"
import { checkUser } from "../middleware/authMiddleware.js"

const router = express.Router()


router.route("/").get(getAllBlogs).post(checkUser, createBlog)
router.route("/:id").get(getBlogById).patch(updateBlog).delete(deleteBlog)

export default router
