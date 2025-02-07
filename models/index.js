const { Sequelize, DataTypes } = require('sequelize');

// Создайте подключение к базе данных
const sequelize = new Sequelize('coursach', 'root', '', {
  host: '127.127.126.26',
  dialect: 'mysql', 
});


module.exports = { sequelize, DataTypes };
