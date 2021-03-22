const router = require("express").Router();
let Calendar = require("../models/calendar.model");
var cors = require("cors");
router.use(cors());
const mongoose = require("mongoose");

// Get All Calendar Objects w/ Query Parameters
// Will return all calendars if there are no query parameters
router.route("/").get((req, res) => {
  var queryObj = { ...req.query };
  Calendar.find(queryObj)
    .sort({ _id: -1 })
    .then((calendars) => res.json(calendars))
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET - By all calendars by array of IDs
router.route("/in").post((req, res) => {
  const objectIdArray = req.body.map((id) => {
    return mongoose.Types.ObjectId(id);
  });

  Calendar.find({ _id: { $in: objectIdArray } })
    .then((calendars) => res.json(calendars))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get Calendar Object by ID
router.route("/:id").get((req, res) => {
  Calendar.findById(req.params.id)
    .then((calendar) => res.json(calendar))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST - add new calendar
router.route("/").post((req, res) => {
  const newCalendar = new Calendar(req.body);
  newCalendar
    .save()
    .then(() => res.json(newCalendar))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE - delete calendar by id
router.route("/:id").delete((req, res) => {
  // delete by ID
  Calendar.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Calendar with id ${req.params.id} deleted.`))
    .catch((err) => res.status(400).json("Error: " + err)); // 500 might be better
});

// UPDATE - update calendar by id
router.route("/:id").post((req, res) => {
  Calendar.findOneAndUpdate({ _id: req.params.id }, req.body, { returnOriginal: false })
    .then((calendar) => res.json(calendar))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
