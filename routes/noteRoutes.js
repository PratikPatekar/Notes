const express = require("express");
const NoteController = require("../Controllers/noteController");
const verify = require("./verifyToken");

const app = express.Router();

app.get("/", verify, NoteController.findAll);

app.post("/add", verify, NoteController.addNew);

app.put("/update", verify, NoteController.updateNote);

app.delete("/delete", verify, NoteController.deleteNote);

module.exports = app;
