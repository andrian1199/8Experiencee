import express from 'express';
import { register, verifyOTP, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register); // Pendaftaran pengguna
router.post('/verify-otp', verifyOTP); // Verifikasi OTP
router.post('/login', login); // Login pengguna

export default router;
