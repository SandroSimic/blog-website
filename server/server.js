import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import blogRouter from "./routes/blogsRoute.js"
import userRouter from "./routes/usersRoute.js"
import connectDB from "./data/config/connectDB.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
dotenv.config()

connectDB()

const app = express()

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use(morgan("dev"))

app.use("/api/v1/blogs", blogRouter)
app.use("/api/v1/users", userRouter)

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(notFound)
app.use(errorHandler)


app.listen(process.env.PORT, (req, res) => {
  console.log("server running on port " + process.env.PORT)
})
