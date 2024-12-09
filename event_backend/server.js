const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use("/public", express.static("public"));

// Konfigurasi Multer untuk menyimpan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Folder untuk menyimpan file
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Menentukan ekstensi file
    cb(null, Date.now() + ext); // Menggunakan timestamp agar nama file unik
  },
});

const upload = multer({ storage: storage });

// Rute untuk upload gambar
app.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const imagePath = "/images/" + req.file.filename;
  res.status(200).send({ imageUrl: imagePath });

});

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

// CREATE, READ, DELETE, UPDATE events...
// (Tidak ada perubahan pada rute ini, cukup seperti sebelumnya)


// CREATE: Tambah event baru
app.post("/events", upload.fields([{ name: "image", maxCount: 1 }, { name: "additionalImage", maxCount: 1 }]), (req, res) => {
  const { title, date, location, price, genre, type, description, tickets } = req.body;

  // Menyimpan nama file gambar jika ada
  const image = req.files["image"] ? "/images/" + req.files["image"][0].filename : null;
  const additionalImage = req.files["additionalImage"] ? "/images/" + req.files["additionalImage"][0].filename : null;

  if (!title || !date || !location || !price || !genre || !type || !description || !image || !additionalImage) {
    return res.status(400).send("Semua data event harus diisi");
  }

  const sql =
    "INSERT INTO events (title, date, location, price, genre, type, description, image, additionalImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
  const sql = "SELECT * FROM events";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Gagal mengambil data event");
    }
    res.status(200).json(results);
  });
});

// DELETE: Hapus event dan tiket terkait
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
app.put("/events/:id", upload.fields([{ name: "image", maxCount: 1 }, { name: "additionalImage", maxCount: 1 }]), (req, res) => {
  const { id } = req.params;
  const { title, date, location, price, genre, type, description, tickets } = req.body;

  // Menyimpan nama file gambar jika ada
  const image = req.files["image"] ? "/images/" + req.files["image"][0].filename : null;
  const additionalImage = req.files["additionalImage"] ? "/images/" + req.files["additionalImage"][0].filename : null;

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

        // Validasi tiket sebelum melanjutkan ke database
        if (
          !ticketId || // ID tiket harus ada
          !type || // Jenis tiket harus ada
          !price || isNaN(Number(price)) || Number(price) <= 0 || // Harga harus angka positif
          !stock || isNaN(Number(stock)) || Number(stock) < 0 // Stok harus angka non-negatif
        ) {
          console.warn(`Data tiket tidak valid: ${JSON.stringify(ticket)}`);
          return Promise.resolve(); // Lewati tiket ini jika tidak valid
        }

        const ticketSql =
          "UPDATE tickets SET type = ?, price = ?, benefits = ?, stock = ? WHERE id = ? AND event_id = ?";
        return new Promise((resolve, reject) => {
          db.query(ticketSql, [type, price, benefits, stock, ticketId, id], (ticketErr, result) => {
            if (ticketErr) reject(ticketErr);
            else if (result.affectedRows === 0) {
              reject(`Tiket dengan ID ${ticketId} tidak ditemukan atau tidak sesuai dengan event`);
            } else {
              resolve(`Tiket dengan ID ${ticketId} berhasil diperbarui`);
            }
          });
        });
      });

      // Gunakan Promise.allSettled untuk menangani pembaruan tiket
      Promise.allSettled(ticketPromises)
        .then((results) => {
          const failedTickets = results.filter((result) => result.status === "rejected");
          const successfulTickets = results.filter((result) => result.status === "fulfilled");

          // Respons jika ada tiket yang gagal diperbarui
          res.status(200).send({
            message: `Event dengan ID ${id} berhasil diperbarui`,
            ticketsSuccess: successfulTickets,
            ticketsWarnings: failedTickets,
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
