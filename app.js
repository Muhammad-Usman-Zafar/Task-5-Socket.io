const io = require('socket.io')(8000)
const cors = require("cors");
    

io.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
}));

const users = {}


io.on("connection", (socket) => {
    socket.on('new-user-joined', (name) => {
        console.log(`New user joined: ${name}`);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    
    socket.on('send', (message) => {
        console.log(`Message received from ${users[socket.id]}: ${message}`);
        socket.broadcast.emit('received', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', (message) => {
        console.log(`Message received from ${users[socket.id]}: ${message}`);
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]
    });
});