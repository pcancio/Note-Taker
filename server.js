const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function getJSON() {
    return JSON.parse(fs.readFileSync('./db/db.json', 'UTF-8'))
};
// get commands
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (req, res) => {
    return res.JSON(getJSON());
});

// post command
app.post('/api/notes', (req, res) => {
    const notesArray = getJSON();
    let newNote = req.body;
    newNote.id = notes.length - 1;
    notesArray.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notesArray), 'UTF-8')
    res.json(newNote)
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));