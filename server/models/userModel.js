import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import validator from 'validator'




const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: [true, 'Name is already taken']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email is already taken'],
            lowercase: true,
            validate: [validator.isEmail, "Please enter a valid email address"]
        },
        password: {
            type: String,
            minLength: [6, 'Password must be at least 6 characters long'],
            required: [true, 'Password is required'],

        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: 'user'
        },
        image: {
            type: String,
            default: 'https://icon-library.com/images/default-user-icon/default-user-icon-20.jpg'
        },
        bookmarkedBlogs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Blog"
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
    },
    {
        timestamps: true,
    }
)



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})



const User = mongoose.model("User", userSchema)

export default User
