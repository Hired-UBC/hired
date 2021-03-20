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
    numAssignees: {
      type: Number,
      required: true,
    },
    assignees: [
      {
        type: String,
        required: false,
        unique: false,
      },
    ],
    applicants: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        signedUpForInterview: { type: Boolean, required: true },
      },
    ],
    slotsInDay: [
      {
        date: { type: Date, required: true },
        timeSlots: [
          {
            time: { type: String, required: true },
            interviewees: [{ type: ObjectId, required: true }],
            interviewers: [{ type: ObjectId, required: true }],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;
