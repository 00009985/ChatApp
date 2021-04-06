const chatForm = document.getElementById('chat-form');

const socket = io();


socket.on('message', message =>{
    console.log(message);
});

//Submitting the message 
chatForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    //Send message to server
    socket.emit('chatMessage', msg);
})