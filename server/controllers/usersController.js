import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password, image } = req.body
    const newUser = await User.create({
        username, email, password, image
    })

    await newUser.save()
    res.send(newUser)
})

export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})