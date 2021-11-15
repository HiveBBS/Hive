'use strict';

const express = require('express');
const { posting } = require('../models');

const router = express.Router();

router.get('/posting', handleGetPostings);
router.get('/posting/:id', handleGetOnePosting);

async function handleGetPostings(req, res) {
  try {
    let getAllPosts = await posting.findAll();
    res.status(200).json(getAllPosts);
  } catch (err) {
    console.error(err)
  }
}

async function handleGetOnePosting(req, res) {
  try {
    const id = req.params.id;
    let getOnePost = await posting.findByPk(id);
    res.status(200).json({
      id: getOnePost.id,
    });
  } catch (err) {
    console.error(err)
  }
}

module.exports = router;