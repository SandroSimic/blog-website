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
            required: true,
            validate: [validator.isEmail, "Invalid email address"]
        },
        password: {
            type: String,
            minLength: [6, 'Password must be at least 6 characters long'],
            validate: {
                validator: function (value) {
                    return /^[A-Z]/.test(value);
                },
                message: "Password must start with an uppercase letter"
            }
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: 'user'
        },
        image: {
            type: String,
            default: "https://icon-library.com/images/default-user-icon/default-user-icon-20.jpg"
        }
    },
    {
        timestamps: true,
    }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    console.log(enteredPassword, this.password)
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})



const User = mongoose.model("User", userSchema)

export default User
