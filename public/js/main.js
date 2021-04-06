const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

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
    div.innerHTML= `<p class="meta"> Brad <span>9:12pm</span></p>
    <p class="text">
    ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}