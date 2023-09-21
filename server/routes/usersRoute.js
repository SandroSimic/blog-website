import express from "express"
import { registerUser, loginUser, logoutUser, getAllUsers, getUserById, getUsersBlogs } from "../controllers/usersController.js"
import { uploadUserImage } from './../utils/multerConfig.js'
import { checkUser } from "../middleware/authMiddleware.js"


const router = express.Router()


router.route('/login').post(loginUser)
router.route('/register').post(uploadUserImage.single('userImage'), registerUser)
router.route('/logout').post(logoutUser)

router.route('/').get(checkUser, getAllUsers)
router.route('/:userId').get(checkUser, getUserById)
router.route('/blog/:userId').get(getUsersBlogs)

export default router
