const router = require("express").Router();
let User = require("../models/user.model");
var cors = require("cors");
router.use(cors());
const mongoose = require("mongoose");

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
  const newUser = new User(req.body);

  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET - By all users by array of IDs
router.route("/in").post((req, res) => {
  const objectIdArray = req.body.map((id) => {
    return mongoose.Types.ObjectId(id);
  });

  User.find({ _id: { $in: objectIdArray } })
    .then((users) => res.json(users))
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
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((userObj) => {
      res.json(userObj);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
