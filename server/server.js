import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import blogRouter from "./routes/blogsRoute.js"
import connectDB from "./data/config/connectDB.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import bodyParser from "body-parser"
dotenv.config()

connectDB()

const app = express()

//Body parser middleware
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use(morgan("dev"))

app.use("/api/v1/blogs", blogRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(8000, (req, res) => {
  console.log("server running on port 8000")
})
