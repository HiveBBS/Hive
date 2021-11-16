'use strict';


'use strict';

const express = require('express');
const { posting } = require('../models/index.js');
const bearerHandler = require('../auth/bearer.js');
const aclHandler = require('../auth/acl.js');

const router = express.Router();

router.post('/posting', bearerHandler, aclHandler('create'), handleCreatePosting);
router.put('/posting/:id', bearerHandler, aclHandler('update'), handleUpdatePosting);
router.delete('/posting/:id', bearerHandler, aclHandler('delete'), handleDeletePosting);

async function handleCreatePosting(req, res) {
  try {
    let obj = req.body;
    console.log('****************', req.user.dataValues.username);
    let sellerObj = {"seller":`${req.user.dataValues.username}`, ...obj}
    let newPosting = await posting.create(sellerObj);
    res.status(201).json(newPosting);
  } catch (err) {
    console.error(err)
  }
}

async function handleUpdatePosting(req, res) {
  try {
    const id = req.params.id;
    const obj = req.body;
    console.log('**********************', id, obj)
    let updatedPosting = await posting.update(obj, {where: { id }});
    res.status(200).json(updatedPosting);
  } catch (err) {
    console.error(err)
  }
}

async function handleDeletePosting(req, res) {
  try {
    let id = req.params.id;
    let deletedPosting = await posting.destroy({ where: { id }});
    res.status(200).json(deletedPosting);
  } catch (err) {
    console.error(err)
  }
}

module.exports = router;


