var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;

let arrNewUser = [];

/* ------- Express Setup ------- */
server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

/* ------- Socket.io Setup ------- */
io.on("connection", (socket) => {
  socket.on("calc", (data) => {
    arrNewUser.unshift(data);
    io.sockets.emit("message", data);
    // socket.emit("message", data);
    console.log(arrNewUser);
  });

  // Send array data on new socket connection
  socket.emit("load existing", arrNewUser);
});
