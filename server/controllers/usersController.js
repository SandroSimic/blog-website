import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import { createToken } from "../utils/tokenUtils.js";
import Blog from "../models/blogModel.js";



const maxAge = 3 * 24 * 60 * 60

export const registerUser = asyncHandler(async (req, res) => {

    console.log(req.file)
    console.log(req.body)

    const { username, email, password } = req.body

    const user = await User.create({
        username, email, password, image: req.file.path
    })
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            image: user.image,
            role: user.role
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email });

    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            const token = await createToken(user._id)



            res.cookie('authToken', token, {
                httpOnly: true, maxAge: 1000 * 60 * 60 * 24, secure: true,
                sameSite: 'None',

            },)

            res.json(user)
        } else {
            throw Error('Incorrect password')
        }
    } else {
        res.status(401).json({
            message: "Invalid email or password"
        })
    }
})

export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true, maxAge: new Date(0), secure: true,
        sameSite: 'None',
    })

    res.status(200).json({
        message: "Logged out successfully",
    })
})




export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}, '-password')

    if (users.length === 0) {
        res.status(404).json({
            message: 'No users found'
        })
    }

    res.status(200).json(users)
})


export const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.userId


    const user = await User.findById(userId)


    res.status(200).json({
        user
    })
})

export const getUsersBlogs = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId;

        const blogs = await Blog.find({ creator: userId });

        if (blogs.length === 0) {
            return res.status(404).json({
                message: 'No blogs found for this user'
            });
        }

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}) 