const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the notes using: GET "api/auth/fetchallnotes". Login Required!
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})



//ROUTE 2: Adding a note using: POST "api/auth/addnote". Login Required!
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Enter a valid Description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // adding the note
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save()
        res.json(savenote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE 3: Update an existing note using: PUT "api/auth/updatenote/:id". Login Required!
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Create a new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        //Check if the user isn't updating someone else's note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server error')
    }
})


//ROUTE 4: Delete an existing note using: DELETE "api/auth/deletenote/:id". Login Required!
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        //Check if the user isn't deleting someone else's note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been Deleted" })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})


module.exports = router