// models/index.js

const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

const models = {
  Task: require('./task')(sequelize)
};

module.exports = {
  sequelize,
  ...models
};