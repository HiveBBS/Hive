"use strict";

const client = require("socket.io-client");
const bbsClient = client.connect("https://hivebbs.herokuapp.com");

bbsClient.on("auto", (payload) => {
  console.log(payload);
});
