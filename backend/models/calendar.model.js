const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;

const CalendarSchema = new Schema(
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
    description: {
      type: String,
      required: true,
      default: "Interview",
    },
    dateStart: {
      type: String,
      required: true,
    },
    dateEnd: {
      type: String,
      required: true,
    },
    timeStart: {
      type: String,
      required: true,
    },
    timeEnd: {
      type: String,
      required: true,
    },
    slotDuration: {
      type: String,
      required: true,
    },
    assignees: [
      {
        type: String,
        required: true,
        unique: true,
      },
    ],
    slots: {
      type: ObjectId,
      ref: "Slot",
    },
  },
  {
    timestamps: true,
  }
);

const Calendar = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendar;
