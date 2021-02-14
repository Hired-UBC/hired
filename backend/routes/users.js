const router = require("express").Router();
let User = require("../models/user.model");
var cors = require("cors");
router.use(cors());

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const passwordHash = req.body.passwordHash;
  const googleID = req.body.googleID;
  const date = Date.parse(req.body.date);

  const newUser = new User({
    firstName,
    lastName,
    email,
    passwordHash,
    googleID,
    date,
  });

  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
