const fs = require('fs');
const path = require('path');

// function to retrieve all notes
function filterByQuery(query, noteArray) {
    let filteredResults = noteArray;

    return filteredResults;
}

// function to write/POST new note
function createNewNote(body, noteArray) {
    const note = body;
    noteArray.push(note);
    fs.writeFileSync (
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: noteArray}, null, 2)
    );
    return note;
}

// function to delete note
function deleteById(id, noteArray) {
    const result = noteArray.filter(note => note.id === id)[0];
    return result;
}

// validates correct formatting of note
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    createNewNote,
    deleteById,
    validateNote
};