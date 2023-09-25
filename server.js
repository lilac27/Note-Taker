// server.js
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const notesRouter = require('./routes/notes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Use the notes route
app.use('/api/notes', notesRouter);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

