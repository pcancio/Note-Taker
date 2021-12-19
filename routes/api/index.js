const router = require('express').Router();
const notes = require('../../db/db.json');
const { addNote, eraseNote } = require('../../lib/note');

// get notes
router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
})

// post notes  
router.post('/notes', (req, res) => {
    const note = addNote(req.body, notes);
    res.json(note);
})

// erase notes
router.delete('/notes/:id', (req, res) => {
    eraseNote(req.params.id, notes);
    res.json(req.body);
})

module.exports = router;