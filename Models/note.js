const { noteSchema } = require("./db");

const Note = {};

Note.addNew = (data) => {
  const newNote = new noteSchema(data);
  return newNote.save();
};

Note.findAll = () => {
  return noteSchema.find();
};

Note.updateNote = (data, id) => {
  return noteSchema.findByIdAndUpdate(id, data);
};

Note.deleteNote = (id) => {
  const note = noteSchema.findByIdAndDelete(id);
  return note;
};

module.exports = Note;
