"use strict";

const client = require("socket.io-client");
const bbsClient = client.connect("http://localhost:3000");

bbsClient.on("furniture", (payload) => {
  console.log(payload);
});
