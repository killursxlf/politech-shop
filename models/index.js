const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('coursach', 'root', '', {
  host: '127.127.126.26',
  dialect: 'mysql', 
});


module.exports = { sequelize, DataTypes };
