const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamName: {type: String, required: true, unique: true},
    users: {type: Array, required: false},
    subTeams: {type: Array, required: false}, 
    applicants: {type: Array, required: false},
    calendars: {type: Array, required: false}
},
{
    timestamps: true
})

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;