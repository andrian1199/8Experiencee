import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../models/User.js';

// Fungsi untuk mengirim OTP ke email pengguna
const sendOTP = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Email pengirim
      pass: process.env.EMAIL_PASSWORD, // Password email pengirim
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Kode OTP Konfirmasi Email',
    text: `Kode OTP Anda adalah: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Pendaftaran pengguna
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomBytes(3).toString('hex'); // Generate OTP
    const otpExpires = Date.now() + 3600000; // OTP valid for 1 hour

    const newUser = new User({ name, email, password: hashedPassword, otp, otpExpires });
    await newUser.save();

    // Kirim OTP ke email
    await sendOTP(email, otp);

    res.status(201).json({ message: 'Pengguna berhasil terdaftar, cek email untuk OTP' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

// Verifikasi OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email tidak ditemukan' });
    if (user.otp !== otp) return res.status(400).json({ message: 'OTP salah' });
    if (user.otpExpires < Date.now()) return res.status(400).json({ message: 'OTP telah kedaluwarsa' });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: 'Email berhasil diverifikasi' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

// Login pengguna
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Pengguna tidak ditemukan' });
    if (!user.isVerified) return res.status(400).json({ message: 'Email belum diverifikasi' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Password salah' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

export { register, verifyOTP, login };
