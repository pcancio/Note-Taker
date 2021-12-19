const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');

function addNote(data, array) {
    if (!data.id) {
        data.id = uuid();
    }
    array.push(data);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(array), err => {
        err ? console.log(err) : console.log('added note');
    })
    return data;
}

function deleteNote(id, note) {
    let indexID = note.map(x => { return x.id }).indexOf(id);
    note.splice(indexID, 1);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(note), err => {
        err ? console.log(err) : console.log('deleted note');
    })
}

module.exports = { addNote, deleteNote };