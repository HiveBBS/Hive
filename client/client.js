"use strict";

const client = require("socket.io-client");
const bbsClient = client.connect("http://localhost:3000");

bbsClient.on("update", (payload) => {
  console.log(payload);
});
