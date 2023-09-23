import { Server } from "socket.io";

const io = new Server({
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