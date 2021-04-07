const path = require('path');
const http = require('http');
const express = require ('express');
const socketio = require('socket.io');
const formatMessage = require('./messages');
const { userJoin, getCurrentUser } = require('./userList');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 3000 || process.env.PORT;
const botName = 'ChatApp Bot';
app.set('view engine', 'pug')
app.use('/static', express.static(path.join(__dirname, 'public')));

//run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) =>{
        const user = userJoin(socket.id, username, room);
        socket.join(user.room)
        //Welcome message
        socket.emit('message', formatMessage(botName, 'Welcome to chat app'));

        //broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName ,`${user.username} has joined the chat`));
    })
    
    //when client disconnects
    socket.on('disconnect', () =>{
       io.emit('message', formatMessage(botName, 'A user has left the chat'));
    });

    // listen for chatMessage
    socket.on('chatMessage', msg =>{
        io.emit('message', formatMessage('USER', msg));
    })
});

app.get('/chat', (req, res) =>{
    res.render('chat')
})

app.get('/', (req, res) =>{
    res.render('home')
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
