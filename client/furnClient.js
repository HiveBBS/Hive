"use strict";

const client = require("socket.io-client");
const bbsClient = client.connect("https://hivebbs.herokuapp.com");

bbsClient.on("furniture", (payload) => {
  console.log(payload);
});
