/* ------- Express Server Setup ------- */
const express = require('express');
const app = express();
const path = require('path');
const server = app.listen(3000, () => {
  console.log("Good afternoon Mr. Wick, here for pleasure or business?");
});
const socket = require('socket.io'); //require the socket.io package
const io = socket(server);
let numSockets = 0; //counter for number of open sockets
let arrNewUser = [];

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

/* ------- Socket.io Setup ------- */
//console.log(socket) for all the data
io.sockets.on('connection', (socket) => {

  socket.on('calc', (data) => {
    arrNewUser.unshift(data);
    io.sockets.emit('message', data);
    console.log(arrNewUser);
  });

  //send array data on new socket connection
  socket.emit('load existing', arrNewUser);

  /* console.log(socket); //Displays all of the connected socket information */

});
