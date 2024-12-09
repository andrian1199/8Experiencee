const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// GET: Ambil semua event
router.get('/', (req, res) => {
  const query = 'SELECT * FROM events';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST: Tambah event baru
router.post('/', (req, res) => {
  const {
    title,
    date,
    location,
    price,
    genre,
    type,
    description,
    tickets,
    image,
    additionalImages,
  } = req.body;

  const query = 'INSERT INTO events SET ?';
  const eventData = {
    title,
    date,
    location,
    price,
    genre,
    type,
    description,
    image,
    additionalImages: JSON.stringify(additionalImages),
    tickets: JSON.stringify(tickets),
  };

  db.query(query, eventData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, ...eventData });
  });
});

// DELETE: Hapus event
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM events WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Event deleted successfully' });
  });
});

module.exports = router;
