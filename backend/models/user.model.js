const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.models = {};
mongoose.userSchema = {};

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    passwordHash: { type: String, required: false },
    teamIDs: [
      {
        type: String,
        required: false,
        trim: true,
      },
    ],
    interviewIDs: [
      {
        type: String,
        required: false,
      },
    ],
    emailVerified: { type: Boolean, required: false, default: false },
    devRole: { type: String, required: false, default: "root" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
