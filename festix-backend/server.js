import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Ganti dengan username MySQL Anda
  password: '',  // Ganti dengan password MySQL Anda
  database: 'festix',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Menambahkan middleware CORS, memungkinkan permintaan lintas domain

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// User Registration (Daftar)
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'Registration successful!' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// User Login (Login)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [username],
    async (err, results) => {
      if (err || results.length === 0) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token });
    }
  );
});

// Send OTP via Email (Kirim OTP)
app.post('/send-otp', (req, res) => {
  const { email } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Simpan OTP ke database
    db.query(
      'INSERT INTO otp (user_id, otp) VALUES (?, ?)',
      [user.id, otp],
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to store OTP' });
        }

        // Kirim OTP melalui email
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Your OTP for Festix',
          text: `Your OTP code is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return res.status(500).json({ message: 'Failed to send OTP' });
          }
          res.status(200).json({ message: 'OTP sent successfully!' });
        });
      }
    );
  });
});

// Verify OTP (Verifikasi OTP)
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];

    db.query(
      'SELECT * FROM otp WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [user.id],
      (err, otpResults) => {
        if (err || otpResults.length === 0) {
          return res.status(400).json({ message: 'OTP not found' });
        }

        const storedOtp = otpResults[0];

        if (storedOtp.otp === otp) {
          return res.status(200).json({ message: 'OTP verified successfully!' });
        } else {
          return res.status(400).json({ message: 'Invalid OTP' });
        }
      }
    );
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
