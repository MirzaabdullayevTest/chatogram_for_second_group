const socket = require('socket.io')
const io = socket()

io.on('connection', (socket) => {
    console.log('Socket io is working...');

    socket.emit('message', 'Welcome to chatogram')

    socket.broadcast.emit('joined', 'Someone is joined the chat')

    socket.on('message', (msg) => {
        // console.log(msg);

        io.emit('message', msg)
    })
})

module.exports = io