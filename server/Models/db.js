const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  noteSchema: mongoose.model("notes", NoteSchema),
  userSchema: mongoose.model("users", UserSchema),
};
