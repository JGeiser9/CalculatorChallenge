const app = require("express")();
const path = require("path");
const server = require("http").createServer(app);
const socket = require("socket.io")(server);
const port = process.env.PORT || 3000;

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
io.sockets.on("connection", (socket) => {
  socket.on("calc", (data) => {
    arrNewUser.unshift(data);
    io.sockets.emit("message", data);
    console.log(arrNewUser);
  });

  // Send array data on new socket connection
  socket.emit("load existing", arrNewUser);
});
