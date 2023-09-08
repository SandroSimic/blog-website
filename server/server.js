import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import blogRouter from "./routes/blogsRoute.js"
import userRouter from "./routes/usersRoute.js"
import connectDB from "./data/config/connectDB.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import { checkUser } from './middleware/authMiddleware.js'
dotenv.config()

connectDB()

const app = express()
app.use(cookieParser())

app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))





app.use(morgan("dev"))

app.use("/api/v1/blogs", blogRouter)
app.use("/api/v1/users", userRouter)



app.use(notFound)
app.use(errorHandler)


app.listen(process.env.PORT, (req, res) => {
  console.log("server running on port " + process.env.PORT)
})
