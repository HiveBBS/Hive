"use strict";

const socketio = require("socket.io");
const io = socketio(3030);

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
});

module.exports = (eventName, data) => {
  console.log("SOCKET");
  io.sockets.emit(eventName, data);
};
