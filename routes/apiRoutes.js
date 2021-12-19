const fs = require('fs');
const noteData = require('../db/db.json');

function getJSON() {
    return JSON.parse(fs.readFileSync('./db/db.json', 'UTF-8'))
}

module.exports = function(app) {

    app.get('/api/notes', function(req, res) {
        res.json(getJSON());
    });

    app.post('/api/notes', function(req, res) {
        const notes = getJSON()
        let newNote = req.body
        newNote.id = noteData.length - 1
        notes.push(newNote)
        fs.writeFileSync('./db/db.json', JSON.stringify(notes), 'UTF-8')
        res.json(newNote)
    });

    app.delete('/api/notes/:id', function(req, res) {
        const notes = getJSON()
        const id = parseInt(req.params.id)
        console.log(id)
        const filteredNotes = notes.filter(note => note.id !== id)
        console.log(filteredNotes)
        fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes), 'UTF-8')
        res.sendStatus(200)
    })


};