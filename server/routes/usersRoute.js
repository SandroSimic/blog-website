import express from "express"
import { registerUser, loginUser, logoutUser, getAllUsers, getUserById, getUsersBlogs, getUserBookmarkedBlogs, deleteUser } from "../controllers/usersController.js"
import { uploadUserImage } from './../utils/multerConfig.js'
import { checkAdmin, checkUser } from "../middleware/authMiddleware.js"


const router = express.Router()


router.route('/login').post(loginUser)
router.route('/register').post(uploadUserImage.single('userImage'), registerUser)
router.route('/logout').post(logoutUser)

router.route('/').get(checkUser, getAllUsers)
router.route('/blog/:userId').get(checkUser, getUsersBlogs)

router.route('/:userId').get(checkUser, getUserById).delete(checkUser, deleteUser)

router.route('/:userId/bookmarked-blogs').get(checkUser, getUserBookmarkedBlogs)


export default router
