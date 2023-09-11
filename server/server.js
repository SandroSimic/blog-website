import express from "express"
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser"
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
app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static(__dirname + "/uploads"));








app.use(morgan("dev"))

app.use("/api/v1/blogs", blogRouter)
app.use("/api/v1/users", userRouter)



app.use(notFound)
app.use(errorHandler)


app.listen(process.env.PORT, (req, res) => {
  console.log("server running on port " + process.env.PORT)
})
