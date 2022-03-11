const express = require('express');
const router = express.Router();
const { filterByQuery, createNewNote, deleteById, validateNote } = require('../../lib/notes');
// desctructures note to access the array inside the JSON object
const {notes} = require('../../db/db.json');

// Get all notes
router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Add note
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString(); 

    // validates that note is correctly formatted
    if (!validateNote(req.body)) {
        res.status(400).send('Note is not formatted correctly!');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    };
});

// Delete note
router.delete('/notes/:id', (req, res) => {
    const result = deleteById(req.params.id, notes);

    if (!result) {
        res.status(400).send('Note not found');
    } else {
        notes.filter(note => note.id !== req.params.id);
        res.json(result);
    }
});

module.exports = router;