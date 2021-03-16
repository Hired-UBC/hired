const router = require("express").Router();
let Team = require("../models/team.model");
var cors = require("cors");
router.use(cors());
const mongoose = require("mongoose");

// Get All Team Objects w/ Query Parameters
// Will return all teams if there are no query parameters
router.route("/").get((req, res) => {
  var queryObj = { ...req.query };
  Team.find(queryObj)
    .sort({ _id: -1 })
    .then((teams) => res.json(teams))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST - add new team
router.route("/").post((req, res) => {
  const teamName = req.body.teamName;
  const users = req.body.users;
  const calendars = req.body.calendars;
  const teamCode = req.body.teamCode;

  const newTeam = new Team({
    teamName,
    users,
    calendars,
    teamCode,
  });

  newTeam
    .save()
    .then(() => res.json(newTeam))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST - Get Teams by User ID
router.route("/by-user/:id").post((req, res) => {
  Team.find({ users: { $all: [req.params.id] } })
    .then((teams) => res.json(teams))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE - delete a team by ID
router.route("/:id").delete((req, res) => {
  // delete by ID
  Team.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Team with id ${req.params.id} deleted.`))
    .catch((err) => res.status(400).json("Error: " + err)); // 500 might be better
});

// Get Team Object by ID
router.route("/:id").get((req, res) => {
  Team.findById(req.params.id)
    .then((team) => res.json(team))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update Team Object by ID
router.route("/:id").post((req, res) => {
  Team.updateOne({ _id: req.params.id }, req.body)
    .then(() => res.json(`Team updated!`))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/").get((req, res) => {
//   res.send("You're at the Teams endpoint");
// });

module.exports = router;
