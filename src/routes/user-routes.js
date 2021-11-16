"use strict";

"use strict";

const express = require("express");
const bearerHandler = require("../auth/bearer.js");
const aclHandler = require("../auth/acl.js");
const socketService = require("../socket.js");
const {posting} = require('../models/index');
const router = express.Router();

router.post(
  "/posting",
  bearerHandler,
  aclHandler("create"),
  handleCreatePosting
);
router.put(
  "/posting/:id",
  bearerHandler,
  aclHandler("update"),
  handleUpdatePosting
);
router.delete(
  "/posting/:id",
  bearerHandler,
  aclHandler("delete"),
  handleDeletePosting
);

async function handleCreatePosting(req, res) {
  try {
    let obj = req.body;
    // console.log("****************", req.user.dataValues.username);
    let sellerObj = { seller: `${req.user.dataValues.username}`, ...obj };
    let newPosting = await posting.create(sellerObj);
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
    let updator = req.user.dataValues.username;
    let oldPost = await posting.findOne({where: {id}});
    let poster = oldPost.dataValues.seller;

    // console.log("**********************");
    // console.log('oldPost', oldPost);
    // console.log('updator', updator);
    // console.log('poster', poster);
    if (updator === poster) {
      let updatedPosting = await posting.update(obj, { where: { id } });
      res.status(200).json(updatedPosting);
    } else {
      throw new Error('Invalid user');
    }
  } catch (err) {
    console.error(err);
  }
}

async function handleDeletePosting(req, res) {
  try {
    let id = req.params.id;
    let deleter = req.user.dataValues.username;
    let oldPost = await posting.findOne({where: {id}});
    let poster = oldPost.dataValues.seller;
    if (deleter === poster) {
      let deletedPosting = await posting.destroy({ where: { id } });
      res.status(200).json(deletedPosting);
    } else {
      throw new Error('Invalid user');
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = router;
