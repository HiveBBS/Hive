"use strict";

// const io = require('./server.js');



module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);
  });
  return (eventName, data) => { 
    console.log("SOCKET");
    io.sockets.emit(eventName, data);
} 
};
