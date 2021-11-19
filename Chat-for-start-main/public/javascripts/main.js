const socket = io()
const messageField = document.querySelector('.chat__messages');
const inp = document.querySelector('.chat__message');
const form = document.querySelector('#chat-form');

socket.on('message', (data) => {
    // console.log(data);

    outputMessage(data)
})

socket.on('joined', (msg) => {
    outputMessage(msg)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let msg = inp.value  /// ssss
    // console.log(msg);

    inp.value = ''

    socket.emit('message', msg)
})

const outputMessage = (msg) => {
    let div = document.createElement('div');

    div.innerHTML = `
        <p class="meta">
            <p class="meta_text">${msg}</p>
        </p>
    `
    messageField.appendChild(div)
}