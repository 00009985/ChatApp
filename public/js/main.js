const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//getting the Username and room name form the url
const { username, room } = Qs.parse(location.search, {
    //using option ignoreQueryPrefix not to get special characters included in the url
    ignoreQueryPrefix: true
})

console.log(username, room);

const socket = io();

//
socket.emit('joinRoom', { username, room });

//getting users and room
socket.on('roomUsers', ({ room, users }) =>{
    outputRoomName(room);
    outputUsers(users);
});

//outputing the message from server
socket.on('message', message =>{
    console.log(message);
    outputMessage(message);

    //moving down when the new message is sent
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Submitting the message 
chatForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    //Send message to server
    socket.emit('chatMessage', msg);

    //clearing the input box if the message was sent
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus(); 
})

//output the message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML= `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// adding the room name to DOM
function outputRoomName(room){
    roomName.innerText = room;
}

//adding the username to DOM
function outputUsers(users){
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}`
}