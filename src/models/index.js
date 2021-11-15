'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users.js');
const postingModel = require('./posting.js');

const options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL, options);
const users = userModel(sequelize, DataTypes);
const posting = postingModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users,
  posting
}