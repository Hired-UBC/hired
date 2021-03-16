const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.models = {};
mongoose.teamSchema = {};

const teamSchema = new Schema(
  {
    teamName: { type: String, required: true },
    users: { type: Array, required: true },
    calendars: { type: Array, required: false },
    teamCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
