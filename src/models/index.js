'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user.js');
const postingModel = require('./posting.js');
const autoModel = require('./auto.js');
const craftModel = require('./arts-crafts.js');
const electModel = require('./electronics.js');
const enterModel = require('./entertainment.js');
const furnModel = require('./furniture.js');
const genModel = require('./general.js');
const houseModel = require('./houseHold.js');
const kidModel = require('./kids.js');
const musicModel = require('./music.js')

const Collection = require('./collection.js');

const options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory:';

const sequelize = new Sequelize(DATABASE_URL, options);
const users = userModel(sequelize, DataTypes);
const posting = postingModel(sequelize, DataTypes);
const auto = autoModel(sequelize, DataTypes);
const craft = craftModel(sequelize, DataTypes);
const electronics = electModel(sequelize, DataTypes);
const entertainment = enterModel(sequelize, DataTypes);
const furniture = furnModel(sequelize, DataTypes);
const general = genModel(sequelize, DataTypes);
const household = houseModel(sequelize, DataTypes);
const kids = kidModel(sequelize, DataTypes);
const music = musicModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users,
  posting: new Collection(posting, auto),
  auto: new Collection(auto),
  craft: new Collection(craft),
  electronics: new Collection(electronics),
  entertainment: new Collection(entertainment),
  furniture: new Collection(furniture),
  general: new Collection(general),
  household: new Collection(household),
  kids: new Collection(kids),
  music: new Collection(music)
}