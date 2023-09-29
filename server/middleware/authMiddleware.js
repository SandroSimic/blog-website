import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const checkUser = async (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken)
        const user = await User.findById(decodedToken.id);
        console.log(user)
        if (!user) {
            req.user = null;
            return next();
        }

        req.user = user;
        console.log("User check:" + user)

        return next();
    } catch (err) {
        req.user = null;
        return next();
    }
};

const checkAdmin = (req, res, next) => {
    const { user } = req;

    console.log('User:', user); // Log user object
    console.log('User Role:', user ? user.role : 'Not authenticated'); // Log user role


    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Requires admin role." });
    }

    return next();
};

export { checkUser, checkAdmin };