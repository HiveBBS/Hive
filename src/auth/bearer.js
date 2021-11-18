'use strict';

const { users } = require('../models');

const bearerAuth = async (req, res, next) => {
  
  try {
    if (!req.headers.authorization){
      next('Invalid Login');
    }
    let bearerHeader = req.headers.authorization.split(' ');
    let token = bearerHeader[1];
    let validUser = await users.authenticateBearer(token);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    console.error('Bearer Auth Error');
    next('Invalid Login');
  }
}

module.exports = bearerAuth;