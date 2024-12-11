const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL
  password: '', // Ganti dengan password MySQL
  database: 'festix_event_management',
});

module.exports = db;
