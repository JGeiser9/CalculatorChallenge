/* ------- Express Server Setup ------- */
const express = require('express');
const app = express();
const path = require('path');
const server = app.listen(3000, () => {
  console.log("Good afternoon Mr. Wick, here for pleasure or business?");
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.sendFile('index.html');
});

/* ------- Socket.io Setup ------- */
const socket = require('socket.io'); //require the socket.io package
const io = socket(server);

//When a user visits the page a connection is made and logs this to console
//console.log(socket) for all the data
io.sockets.on('connection', (socket) => {
  console.log("new connection: " + socket.id);
  socket.on('disconnect', function(){
    console.log('user: ' + socket.id + ' disconnected');
  });
});
