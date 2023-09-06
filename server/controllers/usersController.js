import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password, image } = req.body


    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        username, email, password, image
    })

    if (user) {
        generateToken(res, user._id)

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
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            image: user.image,
            role: user.role
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({
        message: "Logged out successfully",
    })
})