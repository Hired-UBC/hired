const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  res.send("You're at the Users endpoint");
});

module.exports = router;
