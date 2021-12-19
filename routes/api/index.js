const router = require('express').Router();
const notes = require('../../db/db.json');
const { addNote, deleteNote } = require('../../lib/note');

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
})

router.post('/notes', (req, res) => {
    const note = addNote(req.body, notes);
    res.json(note);
})

router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(req.body);
})