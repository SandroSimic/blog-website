import { Server } from "socket.io";
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


const server = app.listen(process.env.PORT, (req, res) => {
  console.log("server running on port " + process.env.PORT)
})


const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173"
  }
})


let onlineUsers = []

const addNewUser = (username, socketId) => {
  !onlineUsers.some(user => user.username === username) && onlineUsers.push({ username, socketId })
}

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
}

const getUser = (username) => {
  return onlineUsers.find(user => user.username === username)
}

io.on('connection', (socket) => {

  console.log('A user connected')

  socket.on("newUser", (username) => {
    addNewUser(username, socket.id)
  })

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    console.log('Received sendNotification event');
    const receiver = getUser(receiverName);
    console.log(receiver)
    io.to(receiver.socketId).emit("getNotification", {
      senderName, type
    });
  });

  socket.on('disconnect', () => {
    removeUser(socket.id)
    console.log("user disconnected")
  })
})

io.listen(3000)