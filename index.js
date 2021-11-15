"use strict";

const app = require("./src/server.js");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.start(PORT);
