const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const cors = require('cors');

app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // Allow all origins
        methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods
      }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        // Enviar el mensaje a todos los clientes conectados
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3500, () => {
    console.log('listening on *:3000');
});
