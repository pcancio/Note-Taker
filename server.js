const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const bodyParser = require('body-parser');
const path = require('path');
const { application } = require('express');

const notes = require('./db/db.json');
console.log('notes', notes);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

var options = {
    root: path.join(__dirname)
};

app.get('/notes', (req, res) => {
    res.sendFile('/public/notes.html', options, () => {
        console.log('file sent to browser');
    })
});

app.get('/api/notes', (req, res) => {
    console.log('in route');
    res.json(notes);
});

app.get('*', (req, res) => {
    res.sendFile('/public/index.html', options, () => {
        console.log('index sent to browser');
    })
});

app.post('/api/notes', (req, res) => {
        try {
            console.log('request body', req.body);
            const { title, text } = req.body
            const newNote = { title, text }
            console.log('newNote', newNote);
            notes.push(newNote)
            fs.writeFileSync('./db/db.json', JSON.stringify(notes))
            res.status(200).json(newNote)
        } catch (err) {
            res.status(500).json(err)
        }
    }

)



app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));