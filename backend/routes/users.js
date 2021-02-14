const router = require("express").Router();
let User = require("../models/user.model");
var cors = require("cors");
router.use(cors());

// Get All User Objects w/ Query Parameters
// Will return all users if there are no query parameters
router.route("/").get((req, res) => {
  var queryObj = { ...req.query };
  User.find(queryObj)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create New User Object
router.route("/").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const passwordHash = req.body.passwordHash;
  const date = Date.parse(req.body.date);

  const newUser = new User({
    firstName,
    lastName,
    email,
    passwordHash,
    date,
  });

  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get User Object by ID
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete User Object by ID
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json(`User with id ${req.params.id} deleted.`))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update User Object by ID
router.route("/:id").post((req, res) => {
  User.updateOne({ _id: req.params.id }, req.body.userObj)
    .then(() => res.json(`User updated!`))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
