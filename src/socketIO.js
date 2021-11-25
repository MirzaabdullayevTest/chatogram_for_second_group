const socket = require('socket.io')
const io = socket()
const formatMessage = require('../utils/formatTime')
const { userJoin, getCurrentUser, leaveUser, getRoomUsers } = require('../utils/usersDB')

io.on('connection', (socket) => {
    console.log('Socket io is working...');

    socket.on('joinRoom', (user) => {

        const userQuery = userJoin(user.username, user.room, socket.id)

        socket.join(userQuery.room)

        socket.emit('message', formatMessage('Chatogramm staff', 'Welcome to chatogram'))

        socket.broadcast.to(userQuery.room).emit('joined', formatMessage('Chatogramm staff', `${userQuery.username} is joined the chat`))

        io.to(userQuery.room).emit('roomUsers', {
            room: userQuery.room,
            users: getRoomUsers(userQuery.room)
        })
    })



    socket.on('disconnect', () => {

        const leftUser = leaveUser(socket.id)
        // console.log(leftUser);

        io.to(leftUser.room).emit('leave', formatMessage('Chatogramm staff', `${leftUser.username} left the chat`))
    })

    socket.on('message', (msg) => {
        const currentUser = getCurrentUser(socket.id)

        io.to(currentUser.room).emit('message', formatMessage(currentUser.username, msg))
    })
})

module.exports = io