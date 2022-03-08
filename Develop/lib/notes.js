const fs = require("fs");
const path = require("path");

function filterByQuery(query, noteArray) {
    let filteredResults = noteArray;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
}


function createNewNote(body, noteArray) {
    const note = body;
    noteArray.push(note);
    fs.writeFileSync (
        path.json(__dirname, '../db/db.json'),
        JSON.stringify({ notes: noteArray}, null, 2)
    );
    return note;
}

function findById(id, noteArray) {
    const result = noteArray.filter(note => note.id === id)[0];
    return result;
}

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
    findById,
    validateNote
};