// routes/notes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Importing the uuid package

// Path to your JSON file where notes are stored
const dbPath = 'db.json';

// Read all notes
router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const notes = JSON.parse(data);
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new note
router.post('/', (req, res) => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const notes = JSON.parse(data);

    const newNote = {
      id: uuidv4(), // Generate a unique ID for the new note
      title: req.body.title,
      content: req.body.content,
    };

    notes.push(newNote);

    fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));
    res.json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
