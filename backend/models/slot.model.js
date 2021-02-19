const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

mongoose.models = {};
mongoose.slotSchema = {};

const slotSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    interviewees: [
      {
        type: String,
        required: true,
      },
    ],
    interviewers: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;
