const path = require('path');
const http = require('http');
const express = require ('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;
app.set('view engine', 'pug')
app.use('/static', express.static(path.join(__dirname, 'public')));

//run when ckient connects
io.on('connection', socket => {
    socket.emit('message', 'Welcome to chat app');

    //broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    //when client disconnects
    socket.on('disconnect', () =>{
       io.emit('message', 'A user has left the chat');
    });

    // listen for chatMessage
    socket.on('chatMessage', msg =>{
        io.emit('message', msg);
    })
});

app.get('/', (req, res) =>{
    res.render('home')
})

app.get('/chat', (req, res) =>{
    res.render('chat')
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
