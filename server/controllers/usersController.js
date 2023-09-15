import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import { createToken } from "../utils/tokenUtils.js";



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

