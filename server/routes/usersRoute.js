import express from "express"
import {registerUser,loginUser, logoutUser} from "../controllers/usersController.js"

const router = express.Router()

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/logout').post(logoutUser)


export default router
