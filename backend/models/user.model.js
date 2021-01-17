const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true, index: { unique: true } },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    googleID: { type: String, required: false },
    passwordHash: { type: String, required: false },
    //  fill in the rest based on our google doc
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("User", userSchema);

module.exports = Note;
