"use strict";

const app = require("./src/server.js");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const { db } = require('./src/models')

db.sync().then(() => {
  app.start(PORT);
})
