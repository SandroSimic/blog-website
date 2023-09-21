import express from "express"
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blogsController.js"
import { checkAdmin, checkUser } from "../middleware/authMiddleware.js"
import { uploadBlogImage } from "../utils/multerConfig.js"

const router = express.Router()


router.route("/").get(getAllBlogs).post(checkUser, uploadBlogImage.single('blogImage'), createBlog)
router.route("/:id").get(getBlogById).patch(checkUser, uploadBlogImage.single('blogImage'), updateBlog).delete(checkUser, deleteBlog)

// Routes that require admin 
router.route("/:id").patch(checkAdmin, uploadBlogImage.single('blogImage'), updateBlog);
router.route("/:id").delete(checkAdmin, deleteBlog);


export default router
