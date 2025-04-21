const express = require("express")
const Note = require("../models/note")
const router = express.Router()

router.get('/getNotes', async (req, res) => {
  try {
    const notes = await Note.getAllNotes()
    res.send(notes)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

 "http://localhost:3000/users/getNotes"

module.exports = router