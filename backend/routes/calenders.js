const router = require("express").Router();
let Calender = require("../models/team.model");

router.route("/").get((req, res) => {
  res.send("You're at the Calender endpoint");
});

module.exports = router;