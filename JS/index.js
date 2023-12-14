const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('message-input')
const messageContainer = document.querySelector('chat-container')


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = ''
})

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const n = prompt("Enter Your Name");
console.log(n)
socket.emit('new-user-joined', n);

socket.on('user-joined', (name)=>{
    append(`${name} joined the chat`, 'right')
})

socket.on("received", (data)=>{
    append(`${data.name}: ${data.message}, 'left`)

})
socket.on("left", (data)=>{
    append(`${data}: left the chat`, 'left')
})