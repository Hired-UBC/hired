const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.models = {};
mongoose.teamSchema = {};

const teamSchema = new Schema(
  {
    teamName: { type: String, required: true },
    users: { type: String, required: true },
    subteams: { type: Array, required: false },
    calendars: { type: Array, required: false },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("User", teamSchema);

module.exports = Team;
