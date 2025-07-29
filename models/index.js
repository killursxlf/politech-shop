const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('coursach', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql', 
});


module.exports = { sequelize, DataTypes };
