import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const checkUser = (req, res, next) => {
    const token = req.cookies.authToken;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                req.user = null
                next()
            }
            else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                req.user = user
                console.log(req.user)
                next()
            }
        })
    }
}

export { checkUser }