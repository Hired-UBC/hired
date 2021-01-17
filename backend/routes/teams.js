const router = require("express").Router();
let Team = require("../models/team.model");

router.route("/").get((req, res) => {
  res.send("You're at the Teams endpoint");
});

module.exports = router;
