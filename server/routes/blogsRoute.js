import express from "express"
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blogsController.js"
import { checkUser } from "../middleware/authMiddleware.js"
import { uploadBlogImage } from "../utils/multerConfig.js"

const router = express.Router()


router.route("/").get(getAllBlogs).post(checkUser, uploadBlogImage.single('blogImage'), createBlog)
router.route("/:id").get(getBlogById).patch(checkUser, uploadBlogImage.single('blogImage'), updateBlog).delete(checkUser, deleteBlog)

export default router
