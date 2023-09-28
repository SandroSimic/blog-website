import express from "express"
import {
  bookmarkBlog,
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  likeBlog,
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

// like blog
router.route('/:id/like').post(checkUser, likeBlog)

// bookmark blog 
router.route('/:id/bookmark').post(checkUser, bookmarkBlog)

// get user's bookmarked blogs
router.route('/:userId/bookmarked-blogs').get(checkUser, )

export default router
