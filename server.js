const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessages = require("./utils/messages");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

// run when a client connects
io.on("connection", (socket) => {
  console.log(`connection starting with ${socket.id}`);
  // for single connecting client
  socket.emit("message", formatMessages("Admin", "Welcome to chat app"));

  // broadcasts when a user connects
  // for all except current connecting client
  socket.broadcast.emit(
    "message",
    formatMessages("Admin", "a user joined chat")
  );

  // when user disconnects
  socket.on("disconnect", () => {
    // for all clients
    io.emit("message", formatMessages("Admin", "A user has left chat"));
  });

  socket.on("chatMessage", (message) => {
    io.emit("message", formatMessages("User", message));
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
