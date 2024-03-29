const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

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
        type: ObjectId,
        required: false,
        trim: true,
      },
    ],
    interviewIDs: [{
      teamName: {type: String, required: false},
      calendarName: {type: String, required: false}, 
      calendarID: {type: ObjectId, required: false},
      date: {type: Date, required: false},
      slotID: { type: ObjectId, required: false},
    }],
    emailVerified: { type: Boolean, required: false, default: false },
    devRole: { type: String, required: false, default: "root" },
    settings: {
      bgColor: { type: String },
      iconUrl: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
