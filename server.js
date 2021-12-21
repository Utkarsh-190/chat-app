const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// run when a client connects
io.on("connection", (socket) => {
  console.log(`connection starting with ${socket.id}`);
  socket.emit("message", "Welcome to chat app");
});

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
