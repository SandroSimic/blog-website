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
import { Server } from "socket.io";

dotenv.config()

connectDB()

const app = express()
app.use(cookieParser())




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




app.use(cors({ credentials: true, origin: ['http://127.0.0.1:5173', "https://reader-frontend-k8t2.onrender.com"] }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static(join(__dirname, "uploads")));


app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.json("Hello")
})

app.use("/api/v1/blogs", blogRouter)
app.use("/api/v1/users", userRouter)



app.use(notFound)
app.use(errorHandler)


const server = app.listen(process.env.PORT, (req, res) => {
  console.log("server running on port " + process.env.PORT)
})



const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5173", "https://reader-frontend-k8t2.onrender.com"]
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

    if (receiver) {
      io.to(receiver.socketId).emit("getNotification", {
        senderName, type
      });
    } else {
      console.log(`Receiver with username '${receiverName}' not found.`);
    }
  });

  socket.on("removeNotification", ({ senderName, receiverName }) => {
    console.log('Received removeNotification event');
    const receiver = getUser(receiverName);

    if (receiver) {
      io.to(receiver.socketId).emit("notificationRemoved", {
        senderName
      });
    } else {
      console.log(`Receiver with username '${receiverName}' not found.`);
    }
  });



  socket.on('disconnect', () => {
    removeUser(socket.id)
    console.log("user disconnected")
  })
})

io.listen(server)
