const express = require("express");
const Note = require("../models/note");
const router = express.Router();

router
  .get("/getNotes", async (req, res) => {
    try {
      const notes = await Note.getAllNotes();
      res.send(notes);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })
  .post("/addNote", async (req, res) => {
    try {
      const note = await Note.addNote(req.body);
      res.send(note);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })
  .put("/updateNote", async (req, res) => {
    try {
      const note = await Note.updateNote(req.body);
      res.send(note);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })
  .delete("/deleteNote", async (req, res) => {
    try {
      const note = await Note.deleteNote(req.body);
      res.send(note);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  });

("http://localhost:3000/notes/getNotes");

module.exports = router;
