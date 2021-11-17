'use strict';

const express = require('express');
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

router.get('/:model', handleGetPostings);
router.get('/:model/:id', handleGetOnePosting);

async function handleGetPostings(req, res) {
  try {
    console.log('**************', req.model)
    let getAllPosts = await req.model.model.findAll();
    res.status(200).json(getAllPosts);
  } catch (err) {
    console.error(err)
  }
}

async function handleGetOnePosting(req, res) {
  try {
    const id = req.params.id;
    let getOnePost = await req.model.model.findOne({
      where:{id}
     });
    res.status(200).json(getOnePost);
  } catch (err) {
    console.error(err)
  }
}

module.exports = router;