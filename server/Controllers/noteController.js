const Note = require("../Models/note");

const NoteController = {};

NoteController.addNew = async (req, res) => {
  try {
    const note = await Note.addNew(req.body);
    res.json({
      messsage: "success",
      data: note,
    });
  } catch (err) {
    res.status(500).send("Error while adding Note");
  }
};

NoteController.findAll = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json({
      messsage: "success",
      data: notes,
    });
  } catch (err) {
    res.status(404).send("Error while fetching Note");
  }
};

NoteController.updateNote = async (req, res) => {
  try {
    const id = req.body.id;
    const updatedNote = await Note.updateNote(req.body, id);
    if (!updatedNote) throw new Error();
    res.json({
      messsage: "success",
      data: updatedNote,
    });
  } catch (err) {
    res.status(404).send(`Error while updating Note with ID:${req.params.id}`);
  }
};

NoteController.deleteNote = async (req, res) => {
  try {
    const id = req.headers.dataid;
    const deleteNote = await Note.deleteNote(id);
    if (!deleteNote) throw new Error();
    res.json({
      messsage: "success",
      data: deleteNote,
    });
  } catch (err) {
    res.status(404).send(`Error while deleting Note`);
  }
};

module.exports = NoteController;
