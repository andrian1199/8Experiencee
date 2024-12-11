const db = require('../config/db');

class User {
  static create(user, callback) {
    const sql = `INSERT INTO users (email, username, password, phone, birth_date) VALUES (?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [user.email, user.username, user.password, user.phone, user.birth_date],
      callback
    );
  }

  static findByEmail(email, callback) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], callback);
  }
}

module.exports = User;
