const express = require("express"); 
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const authRoutes = require("./routes/auth"); // Sesuaikan path jika berbeda
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use("/public", express.static("public"));


// Koneksi MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Middleware untuk validasi token

// Register endpoint
app.post("/api/auth/register", async (req, res) => {
  console.log(req.body);
  const { email, username, password, phone, birth_date } = req.body;

  // Cek jika email sudah terdaftar
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ success: false, message: "Email sudah digunakan." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke database
    db.query(
      "INSERT INTO users (email, username, password, phone, birth_date) VALUES (?, ?, ?, ?, ?)",
      [email, username, hashedPassword, phone, birth_date],
      (err) => {
        if (err) throw err;
        res.json({ success: true, message: "Pendaftaran berhasil." });
      }
    );
  });
});

// Login endpoint
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Cek pengguna di database
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });
    }

    const user = results[0];

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Password salah." });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, token, user: { id: user.id, email: user.email, username: user.username } });
  });
});


// Middleware untuk validasi token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ success: false, message: "Token tidak ditemukan." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Token tidak valid." });
    }
    req.user = decoded; // Simpan data pengguna ke dalam `req.user`
    next(); // Lanjut ke endpoint berikutnya
  });
};

// Endpoint untuk mendapatkan profil pengguna
app.get("/api/auth/profile", authenticateToken, (req, res) => {
  db.query("SELECT * FROM users WHERE id = ?", [req.user.id], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });
    }

    res.json({ success: true, user: results[0] });
  });
});

// Endpoint untuk memperbarui profil pengguna
app.put("/api/auth/profile", authenticateToken, (req, res) => {
  const { namaLengkap, tanggalLahir, nomorHp, email } = req.body;

  if (!namaLengkap || !tanggalLahir || !nomorHp || !email) {
    return res.status(400).json({ success: false, message: "Semua bidang harus diisi." });
  }

  db.query(
    "UPDATE users SET username = ?, birth_date = ?, phone = ?, email = ? WHERE id = ?",
    [namaLengkap, tanggalLahir, nomorHp, email, req.user.id],
    (err, result) => {
      if (err) {
        console.error("Error updating profile:", err);
        return res.status(500).json({ success: false, message: "Gagal memperbarui profil." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });
      }

      res.json({ success: true, message: "Profil berhasil diperbarui." });
    }
  );
});

app.put("/api/auth/change-password", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ success: false, message: "Token tidak ditemukan." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Token tidak valid." });
    }

    const { oldPassword, newPassword } = req.body;

    // Ambil pengguna berdasarkan ID
    db.query("SELECT * FROM users WHERE id = ?", [decoded.id], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false, message: "Terjadi kesalahan." });
      }

      if (results.length === 0) {
        return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan." });
      }

      const user = results[0];

      // Verifikasi kata sandi lama
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Kata sandi lama salah." });
      }

      // Hash kata sandi baru
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Perbarui kata sandi di database
      db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashedPassword, decoded.id],
        (err) => {
          if (err) {
            console.error("Error updating password:", err);
            return res.status(500).json({ success: false, message: "Gagal mengganti kata sandi." });
          }

          res.json({ success: true, message: "Kata sandi berhasil diperbarui." });
        }
      );
    });
  });
});


// Logout endpoint
app.post("/api/auth/logout", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Ambil token setelah "Bearer"

  if (!token) {
    return res.status(400).json({ success: false, message: "Token tidak ditemukan." });
  }

  // Tambahkan log untuk debugging
  console.log("Logout request token:", token);

  // Untuk logout, Anda bisa menambahkan token ke dalam blacklist
  res.json({ success: true, message: "Logout berhasil." });
});


// CREATE: Tambah event baru
app.post("/events", (req, res) => {
  const { title, date, location, price, genre, type, description, image, additionalImage, tickets } = req.body;

  if (!title || !date || !location || !price || !genre || !type || !description || !image || !additionalImage) {
    return res.status(400).send("Semua data event harus diisi");
  }

  const sql = "INSERT INTO events (title, date, location, price, genre, type, description, image, additionalImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [title, date, location, price, genre, type, description, image, additionalImage], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Gagal menambahkan event");
    }

    const eventId = result.insertId; // Ambil ID event baru
    console.log("Event berhasil ditambahkan dengan ID:", eventId);

    // Tambahkan tiket jika ada
    if (tickets && tickets.length > 0) {
      const ticketPromises = tickets.map((ticket) => {
        const { type, price, benefits, stock } = ticket;

        if (!type || !price || !stock || isNaN(price) || isNaN(stock)) {
          return Promise.reject(`Data tiket tidak valid: ${JSON.stringify(ticket)}`);
        }

        const ticketSql = "INSERT INTO tickets (event_id, type, price, benefits, stock) VALUES (?, ?, ?, ?, ?)";
        return new Promise((resolve, reject) => {
          db.query(ticketSql, [eventId, type, price, benefits, stock], (ticketErr) => {
            if (ticketErr) reject(ticketErr);
            else resolve();
          });
        });
      });

      // Gunakan Promise.allSettled untuk menangani keberhasilan dan kegagalan tiket secara terpisah
      Promise.allSettled(ticketPromises)
        .then((results) => {
          const failedTickets = results.filter((result) => result.status === "rejected");
          if (failedTickets.length > 0) {
            console.warn("Beberapa tiket gagal ditambahkan:", failedTickets);
          }
          res.status(201).send({
            message: `Event berhasil ditambahkan dengan ID: ${eventId}`,
            ticketsStatus: results,
          });
        })
        .catch((err) => {
          console.error("Kesalahan saat menambahkan tiket:", err);
          res.status(500).send("Event ditambahkan, tetapi ada tiket yang gagal ditambahkan");
        });
    } else {
      res.status(201).send(`Event berhasil ditambahkan dengan ID: ${eventId}`);
    }
  });
});

// READ: Ambil semua event
app.get("/events", (req, res) => {
  const sql = `
    SELECT e.*, 
      JSON_ARRAYAGG(
      JSON_OBJECT('id', t.id, 'type', t.type, 'price', t.price, 'benefits', t.benefits, 'stock', t.stock)
      ) AS tickets
    FROM events e
    LEFT JOIN tickets t ON e.id = t.event_id
    GROUP BY e.id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Gagal mengambil data event dan tiket");
    }
    res.status(200).json(results);
  });
});

// READ: Ambil event berdasarkan ID
  app.get("/events/:id", (req, res) => {
    const { id } = req.params; // Ambil ID dari URL
    const sql = `
      SELECT e.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT('id', t.id, 'type', t.type, 'price', t.price, 'benefits', t.benefits, 'stock', t.stock)
        ) AS tickets
      FROM events e
      LEFT JOIN tickets t ON e.id = t.event_id
      WHERE e.id = ?
      GROUP BY e.id
    `;
    
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal mengambil data event dan tiket");
      }

      if (results.length === 0) {
        return res.status(404).send("Event tidak ditemukan");
      }

      res.status(200).json(results[0]); // Mengembalikan event yang sesuai dengan ID
    });
  });




// CREATE: Tambah tiket untuk event tertentu
app.post("/tickets", (req, res) => {
  const { event_id, type, price, benefits, stock } = req.body;

  if (!event_id || !type || !price || !stock || isNaN(price) || isNaN(stock)) {
    return res.status(400).send("Data tiket tidak valid");
  }

  const sql = "INSERT INTO tickets (event_id, type, price, benefits, stock) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [event_id, type, price, benefits, stock], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Gagal menambahkan tiket");
    }
    res.status(201).send("Tiket berhasil ditambahkan");
  });
});

// READ: Ambil semua tiket untuk event tertentu
app.get("/tickets/:event_id", (req, res) => {
  const { event_id } = req.params;
  const sql = "SELECT * FROM tickets WHERE event_id = ?";
  db.query(sql, [event_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Gagal mengambil data tiket");
    }
    res.status(200).json(results);
  });
});

app.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM events WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Gagal menghapus event:", err);
      return res.status(500).send("Gagal menghapus event");
    }

    // Hapus juga tiket terkait jika ada
    const ticketSql = "DELETE FROM tickets WHERE event_id = ?";
    db.query(ticketSql, [id], (ticketErr) => {
      if (ticketErr) {
        console.error("Gagal menghapus tiket terkait:", ticketErr);
        return res.status(500).send("Gagal menghapus tiket terkait");
      }

      res.status(200).send("Event dan tiket terkait berhasil dihapus");
    });
  });
});

// UPDATE: Perbarui event berdasarkan ID
app.put("/events/:id", (req, res) => {
  const { id } = req.params;
  const { title, date, location, price, genre, type, description, image, additionalImage, tickets } = req.body;

  if (!title || !date || !location || !price || !genre || !type || !description || !image || !additionalImage) {
    return res.status(400).send("Semua data event harus diisi");
  }

  const sql =
    "UPDATE events SET title = ?, date = ?, location = ?, price = ?, genre = ?, type = ?, description = ?, image = ?, additionalImage = ? WHERE id = ?";
  db.query(sql, [title, date, location, price, genre, type, description, image, additionalImage, id], (err, result) => {
    if (err) {
      console.error("Gagal memperbarui event:", err);
      return res.status(500).send("Gagal memperbarui event");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Event tidak ditemukan");
    }

    console.log("Event berhasil diperbarui:", id);

    // Perbarui tiket jika ada
    if (tickets && tickets.length > 0) {
      const ticketPromises = tickets.map((ticket) => {
        const { id: ticketId, type, price, benefits, stock } = ticket;

        if (!ticketId || !type || !price || !stock || isNaN(price) || isNaN(stock)) {
          return Promise.reject(`Data tiket tidak valid: ${JSON.stringify(ticket)}`);
        }

        const ticketSql =
          "UPDATE tickets SET type = ?, price = ?, benefits = ?, stock = ? WHERE id = ? AND event_id = ?";
        return new Promise((resolve, reject) => {
          db.query(ticketSql, [type, price, benefits, stock, ticketId, id], (ticketErr) => {
            if (ticketErr) reject(ticketErr);
            else resolve();
          });
        });
      });

      // Gunakan Promise.allSettled untuk menangani pembaruan tiket
      Promise.allSettled(ticketPromises)
        .then((results) => {
          const failedTickets = results.filter((result) => result.status === "rejected");
          if (failedTickets.length > 0) {
            console.warn("Beberapa tiket gagal diperbarui:", failedTickets);
          }
          res.status(200).send({
            message: `Event dengan ID ${id} berhasil diperbarui`,
            ticketsStatus: results,
          });
        })
        .catch((err) => {
          console.error("Kesalahan saat memperbarui tiket:", err);
          res.status(500).send("Event diperbarui, tetapi ada tiket yang gagal diperbarui");
        });
    } else {
      res.status(200).send(`Event dengan ID ${id} berhasil diperbarui`);
    }
  });
});

// UPDATE: Perbarui tiket berdasarkan ID
app.put("/tickets/:id", (req, res) => {
  const { id } = req.params;
  const { type, price, benefits, stock } = req.body;

  if (!type || !price || !stock || isNaN(price) || isNaN(stock)) {
    return res.status(400).send("Data tiket tidak valid");
  }

  const sql = "UPDATE tickets SET type = ?, price = ?, benefits = ?, stock = ? WHERE id = ?";
  db.query(sql, [type, price, benefits, stock, id], (err, result) => {
    if (err) {
      console.error("Gagal memperbarui tiket:", err);
      return res.status(500).send("Gagal memperbarui tiket");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Tiket tidak ditemukan");
    }

    res.status(200).send("Tiket berhasil diperbarui");
  });
});

// DELETE: Hapus tiket berdasarkan ID
app.delete("/tickets/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM tickets WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Gagal menghapus tiket:", err);
      return res.status(500).send("Gagal menghapus tiket");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Tiket tidak ditemukan");
    }

    res.status(200).send("Tiket berhasil dihapus");
  });
});


// Komunitas Backend
// Endpoint untuk mendapatkan semua komunitas
app.get("/communities", (req, res) => {
  const sql = "SELECT * FROM communities";
  db.query(sql, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send("Terjadi kesalahan pada server.");
          return;
      }
      res.json(results);
  });
});

// Endpoint untuk mendapatkan komunitas berdasarkan ID
app.get("/communities/:id", (req, res) => {
  const sql = "SELECT * FROM communities WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send("Terjadi kesalahan pada server.");
          return;
      }
      res.json(results[0]);
  });
});

// Tambah komunitas baru
app.post("/communities", (req, res) => {
  const { title, description, content, category, img, whatsappLink } = req.body;
  const sql =
    "INSERT INTO communities (title, description, content, category, img, whatsappLink) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [title, description, content, category, img, whatsappLink], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Gagal menambahkan komunitas.");
      return;
    }
    res.json({ message: "Komunitas berhasil ditambahkan." });
  });
});

// Update komunitas berdasarkan ID
app.put("/communities/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, content, category, img, whatsappLink } = req.body;
  const sql =
    "UPDATE communities SET title = ?, description = ?, content = ?, category = ?, img = ?, whatsappLink = ? WHERE id = ?";
  db.query(sql, [title, description, content, category, img, whatsappLink, id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Gagal memperbarui komunitas.");
      return;
    }
    res.json({ message: `Komunitas dengan ID ${id} berhasil diperbarui.` });
  });
});


// Hapus komunitas berdasarkan ID
app.delete("/communities/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM communities WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Gagal menghapus komunitas.");
      return;
    }
    res.json({ message: `Komunitas dengan ID ${id} berhasil dihapus.` });
  });
});

// Blog Management
// **1. Create Blog**
app.post("/blogs", (req, res) => {
  const { title, category, author, authorPic, authorBio, date, image, content } = req.body;
  const sql = "INSERT INTO blogs (title, category, author, authorPic, authorBio, date, image, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [title, category, author, authorPic, authorBio, date, image, content], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: "Blog created successfully", id: result.insertId });
  });
});

// **2. Read All Blogs**
app.get("/blogs", (req, res) => {
  const sql = "SELECT * FROM blogs";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
});

// **3. Read Blog by ID**
app.get("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM blogs WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result[0]);
  });
});

// **4. Update Blog**
app.put("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const { title, category, author, authorPic, authorBio, date, image, content } = req.body;
  const sql = "UPDATE blogs SET title = ?, category = ?, author = ?, authorPic = ?, authorBio = ?, date = ?, image = ?, content = ? WHERE id = ?";
  db.query(sql, [title, category, author, authorPic, authorBio, date, image, content, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Blog updated successfully" });
  });
});

// **5. Delete Blog**
app.delete("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM blogs WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Blog deleted successfully" });
  });
});

// Pembelian Tiket
app.get("/api/ticket-purchases", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
      return res.status(403).json({ success: false, message: "Token tidak ditemukan." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).json({ success: false, message: "Token tidak valid." });
      }

      const sql = `
          SELECT tp.id AS purchase_id, tp.quantity, tp.purchase_date, 
                 t.type AS ticket_type, t.price AS ticket_price, 
                 e.title AS event_title, e.date AS event_date, e.location AS event_location
          FROM ticket_purchases tp
          JOIN tickets t ON tp.ticket_id = t.id
          JOIN events e ON t.event_id = e.id
          WHERE tp.user_id = ?
          ORDER BY tp.purchase_date DESC
      `;

      db.query(sql, [decoded.id], (err, results) => {
          if (err) {
              console.error(err);
              return res.status(500).send("Gagal mengambil data pembelian tiket.");
          }
          res.status(200).json(results);
      });
  });
});

app.post("/api/ticket-purchases", (req, res) => {
  const { ticket_id, quantity } = req.body;
  const token = req.headers["authorization"];
  if (!token) {
      return res.status(403).json({ success: false, message: "Token tidak ditemukan." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).json({ success: false, message: "Token tidak valid." });
      }

      const sql = `
          INSERT INTO ticket_purchases (user_id, ticket_id, quantity) 
          VALUES (?, ?, ?)
      `;
      db.query(sql, [decoded.id, ticket_id, quantity], (err) => {
          if (err) {
              console.error(err);
              return res.status(500).send("Gagal menyimpan pembelian tiket.");
          }
          res.status(201).send("Pembelian tiket berhasil disimpan.");
      });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));