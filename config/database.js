const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.127.126.26',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'coursach',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(connection => {
    console.log('База данных подключена!');
    connection.release(); 
  })
  .catch(err => {
    console.error('Ошибка подключения к базе данных:', err);
    process.exit(1);
  });

module.exports = pool;
