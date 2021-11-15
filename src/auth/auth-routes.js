"use strict";

const express = require("express");
const authRouter = express.Router();

const { users } = require("../models/user.js");
const basicAuth = require("./basic.js");
// const bearerAuth = require("./bearer.js");
// const permissions = require("./acl.js");

authRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

// authRouter.get(
//   "/users",
//   bearerAuth,
//   permissions("delete"),
//   async (req, res, next) => {
//     const userRecords = await users.findAll({});
//     const list = userRecords.map((user) => user.username);
//     res.status(200).json(list);
//   }
// );

module.exports = authRouter;
