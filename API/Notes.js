require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let notes = []; // Temporary storage

// Get all notes
app.get("/notes", (req, res) => {
    res.json(notes);
});

// Get a single note by ID
app.get("/notes/:id", (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
});

// Create a new note
app.post("/notes", (req, res) => {
    const newNote = { id: notes.length + 1, text: req.body.text };
    notes.push(newNote);
    res.status(201).json(newNote);
});

// Update a note
app.put("/notes/:id", (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).json({ error: "Note not found" });

    note.text = req.body.text;
    res.json(note);
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
    notes = notes.filter(n => n.id !== parseInt(req.params.id));
    res.json({ message: "Note deleted" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
