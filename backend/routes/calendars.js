const router = require("express").Router();
let Calendar = require("../models/calendar.model");

router.route("/").get((req, res) => {
  res.send("You're at the Calendar endpoint");
});

module.exports = router;
