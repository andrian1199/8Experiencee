const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_jwt_secret_key"; 


app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "090301", 
  database: "festix_db", 
});


db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});


app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username dan password harus diisi." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

 
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);

        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: "Username sudah digunakan." });
        }
        return res.status(500).json({ error: "Terjadi kesalahan server." });
      }

      res.status(201).json({ message: "Pengguna berhasil dibuat." });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan server." });
  }
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;


  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Terjadi kesalahan server." });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Username atau password salah." });
    }

    const user = results[0];

    // Cek apakah password sesuai
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Username atau password salah." });
    }


    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

