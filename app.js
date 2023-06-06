const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("Server has started on ", PORT);
});

const connectedUser = new Set();
// connecting the socket to our server

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("connected successfully", socket.id);
  connectedUser.add(socket.id);
  io.emit("connected-user", connectedUser.size);
  socket.on("disconnected", (socket) => {
    console.log("Disconnected", socket.id);
    connectedUser.delete(socket.id);
    io.emit("connected-user", connectedUser.size);
  });
  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("message-receive", data);
  });
});
