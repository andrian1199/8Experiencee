const express = require("express"); 
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

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




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
