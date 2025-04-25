const Socket = require('socket.io');
const http = require('http');
const dotenv = require('dotenv');
dotenv.config();
const Server  = Socket.Server;
const app = require('express')();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:process.env.CLIENT_URL
    }
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
});
module.exports = { io , server , app}