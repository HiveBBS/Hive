"use strict";

"use strict";

const express = require("express");
const { posting } = require("../models/index.js");
const bearerHandler = require("../auth/bearer.js");
const aclHandler = require("../auth/acl.js");
const socketService = require("../socket.js");
const dataModules = require("../models");

const router = express.Router();

router.param("model", (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next("Invalid Model");
  }
});

router.post(
  "/:model",
  bearerHandler,
  aclHandler("create"),
  handleCreatePosting
);
router.put(
  "/:model/:id",
  bearerHandler,
  aclHandler("update"),
  handleUpdatePosting
);
router.delete(
  "/:model/:id",
  bearerHandler,
  aclHandler("delete"),
  handleDeletePosting
);

async function handleCreatePosting(req, res) {
  try {
    let obj = req.body;
    console.log("****************", req.model);

    let sellerObj = { seller: `${req.user.dataValues.username}`, ...obj };
    let newPosting = await req.model.create(sellerObj);
    socketService("update", {
      message: "New item for sale",
      ...newPosting.dataValues,
    });
    res.status(201).json(newPosting);
  } catch (err) {
    console.error(err);
  }
}

async function handleUpdatePosting(req, res) {
  try {
    const id = req.params.id;
    const obj = req.body;
    console.log("**********************", id, obj);
    let updatedPosting = await req.model.update(obj, { where: { id } });
    res.status(200).json(updatedPosting);
  } catch (err) {
    console.error(err);
  }
}

async function handleDeletePosting(req, res) {
  try {
    let id = req.params.id;
    let deletedPosting = await req.model.destroy({ where: { id } });
    res.status(200).json(deletedPosting);
  } catch (err) {
    console.error(err);
  }
}

module.exports = router;
