const { Server } = require("socket.io");

// listen on what https
const io = new Server({ 
  // cors: "http://localhost:5173" 
  cors: {
    origin: "http://chat.king610160.com",
    methods: ["GET", "POST"]
  }
});
let onlineUsers = []

io.on("connection", (socket) => {
  // when socket connect
  socket.on("addNewUser", (userId) => {
     // check there is same userId in the array
    if (!onlineUsers.some(user => user.userId === userId)) {
        // only when no searching result, can push new userId and socket.id in
        // the user array will push userId and related socket.id in
        onlineUsers.push({
            userId,
            socketId: socket.id
        });
    }
      // after get the onlineUsers, then return onlineUsers to frontend
    io.emit("getOnlineUsers", onlineUsers)
  })

  socket.on("sendMessage", (message) => {
    // when user send message, check onlineUser has recipientId or not
    const users = onlineUsers.find(user => user.userId === message.recipientId)
    // if has that users, then emit the message to that socket.id with the message
    if(users) {
        io.to(users.socketId).emit("getMessage", message)
        io.to(users.socketId).emit("getNotification", {
          senderId: message.senderId,
          isRead: false,
          date: new Date()
        })
    }
  })

  socket.on("disconnect", (userId) => {
    // let disconnect's user, and filter out socket.id, and deleted
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    io.emit("getOnlineUsers", onlineUsers)
  })

});

io.listen(3001);