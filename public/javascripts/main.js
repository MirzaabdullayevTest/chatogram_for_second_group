const socket = io()
const messageField = document.querySelector('.chat__messages');
const inp = document.querySelector('.chat__message');
const form = document.querySelector('#chat-form');
const roomName = document.querySelector('#room_name');
const listUsers = document.querySelector('#users');

socket.on('message', (data) => {
    // console.log(data); 
    outputMessage(data)
})

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

socket.emit('joinRoom', ({ username, room }))

// console.log(user);

socket.on('joined', (msg) => {
    outputMessage(msg)
})


socket.on('roomUsers', (msg) => {
    outputRoom(msg.room)
    outputUsersList(msg.users)
})

socket.on('leave', (msg) => {
    // console.log(msg);
    outputMessage(msg)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let msg = inp.value  /// ssss
    // console.log(msg);

    inp.value = ''

    messageField.scrollTop = messageField.scrollHeight

    socket.emit('message', msg)
})

const outputMessage = (data) => {
    let div = document.createElement('div');

    div.innerHTML = `
        <div class="message">
            <div class="meta">
                <p class="meta__username">${data.username}</p>
                <p class="meta_text">${data.text}</p>
                <p class="meta__time">${data.time}</p>
            </div>
        </div>
    `
    messageField.appendChild(div)
}

const outputRoom = (room) => {
    roomName.innerHTML = room
}

const outputUsersList = (users) => {
    listUsers.innerHTML = `
    ${users.map((user) => { return `<li>${user.username}</li>` }).join('')}
    `
}