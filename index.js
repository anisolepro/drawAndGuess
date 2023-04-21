
const io = require('socket.io')(8000, {
    cors: {
        origin: ["http://localhost:3000"
            ,
            "http://smallpp.ga",
            "http://192.168.1.2:3000"]
    }
})

io.on('connection', socket => {
    let username = socket.id;
    console.log("connected", socket.id)

    socket.on("sendMessage", (message, room) => {
        // console.log(message, room)
        socket.to(room).emit('reciveMessage', username, message);
    })

    socket.on("join-room", (name, room, cb) => {
        username = name;
        console.log(username)
        socket.join(room)
        socket.to(room).emit('reciveMessage', `Room Joined By ${username}`, "");
        socket.to(room).emit('userJoin', username);

        cb(username, room)
    })
})

