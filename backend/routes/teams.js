const router = require("express").Router();
let Team = require("../models/team.model");

const bodyParser = require("body-parser")
router.use(bodyParser.json());

router.route("/").get((req, res) => {
  res.send("You're at the Teams endpoint");
});

router.route("/").post((req, res) => {

  const newTeam = new Team({
    teamName: req.body.teamName,
    users: req.body.users,
    subTeams: req.body.subTeams,
    applicants: req.body.applicants,
    calendars: req.body.calendars,
    date: Date.parse(req.body.date),
  });

  newTeam.save()
  .then(() => res.json(newTeam.__id))
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
