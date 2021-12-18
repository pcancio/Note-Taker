const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());

var options = {
    root: path.join(__dirname)
};

app.get('/notes', (req, res) => {
    res.sendFile('/public/notes.html', options, () => {
        console.log('file sent to browser');
    })
});

app.get('*', (req, res) => {
    res.sendFile('/public/index.html', options, () => {
        console.log('index sent to browser');
    })
});

app.get('api/notes', (req, res) => {
    console.log('in route');
    fs.readFile('./db/db.json', (err, data) => {
        if (err) console.error(err);
        res.json(JSON.parse(data));
    })
});

app.listen(PORT, () => console.log('listening on PORT ${PORT}'));