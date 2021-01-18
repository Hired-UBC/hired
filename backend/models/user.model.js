const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    passwordHash: { type: String, required: false },
    teamIDs: { type: Array, required: false },
    interviewIDs: { type: Array, required: false },
    emailVerified: { type: Boolean, required: false, default: false },
    devRole: { type: String, required: false, default: "root" },
    googleID: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("User", userSchema);

module.exports = Note;
