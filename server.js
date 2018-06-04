/* ------- Express Server Setup ------- */
const express = require('express');
const app = express();
const path = require('path');
const server = app.listen(3000, () => {
  console.log("Good afternoon Mr. Wick, here for pleasure or business?");
});
const socket = require('socket.io'); //require the socket.io package
const io = socket(server);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

/* ------- Socket.io Setup ------- */
//console.log(socket) for all the data
io.on('connection', (socket) => {
  console.log('user: ' + socket.id + ' connected');
  socket.on('new message', (data) => {
    io.sockets.emit('display message', data);
    console.log(data);
  });
  socket.on('disconnect', function(){
    console.log('user: ' + socket.id + ' disconnected');
  });
});
