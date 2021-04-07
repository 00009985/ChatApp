const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//getting the Username and room name form the url
const { username, room } = Qs.parse(location.search, {
    //using option ignoreQueryPrefix not to get special characters included in the url
    ignoreQueryPrefix: true
})

console.log(username, room);

const socket = io();

//
socket.emit('joinRoom', { username, room });

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