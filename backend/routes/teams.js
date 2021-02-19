const router = require("express").Router();
let Team = require("../models/team.model");
var cors = require("cors");
router.use(cors());

// GET - all teams
router.route("/").get((req, res) => {
  Team.find()
    .then((teams) => res.json(teams))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST - add new team
router.route("/").post((req, res) => {
  const teamName = req.body.teamName;
  const users = req.body.users
  const subteams = req.body.subteams
  const calendars = req.body.calendars

  const newTeam = new Team ({
   teamName,
   users,
   subteams,
   calendars
  });

  newTeam
    .save()
    .then(() => res.json(newTeam))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE - delete a team by ID
router.route("/:id").delete((req, res) => {
  // delete by ID
  Team.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Team with id ${req.params.id} deleted.`))
    .catch((err) => res.status(400).json("Error: " + err)); // 500 might be better
});

// GET - get a team by ID
router.route("/:id").get((req, res) => {
  const team = Team.find(req.params.id);
  res.status(200).json(team);
}); 


// router.route("/").get((req, res) => {
//   res.send("You're at the Teams endpoint");
// });

module.exports = router;
