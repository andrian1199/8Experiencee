const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Register Endpoint
router.post('/register', async (req, res) => {
  const { email, username, password, phone, birth_date } = req.body;

  try {
    // Cek jika email sudah terdaftar
    User.findByEmail(email, async (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.status(400).json({ success: false, message: 'Email sudah terdaftar' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan user baru
      User.create(
        { email, username, password: hashedPassword, phone, birth_date },
        (err) => {
          if (err) throw err;
          res.json({ success: true, message: 'Registrasi berhasil' });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

// Login Endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    User.findByEmail(email, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        return res.status(400).json({ success: false, message: 'Email tidak ditemukan' });
      }

      const user = result[0];

      // Periksa password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ success: false, message: 'Password salah' });
      }

      res.json({ success: true, message: 'Login berhasil', user: { id: user.id, email: user.email, username: user.username } });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

module.exports = router;
