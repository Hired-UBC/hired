const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

mongoose.models = {};
mongoose.calendarSchema = {};

const calendarSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
    },
    event_type: {
      type: String,
      required: true,
      default: "interview",
      enum: ["interview", "secondInterview", "informationSession"],
      // just added three random enum's for now, can be changed later
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
    timeStart: {
      type: Date,
      required: true,
    },
    timeEnd: {
      type: Date,
      required: true,
    },
    slotDuration: {
      type: String,
      required: true,
    },
    assignees: [
      {
        type: String,
        required: false,
        unique: false,
      },
    ],
    slots: [
      {
        type: ObjectId,
        ref: "Slot",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;
