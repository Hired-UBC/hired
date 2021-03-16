const router = require("express").Router();
let Calendar = require("../models/calendar.model");
var cors = require("cors");
router.use(cors());

// Get All Calendar Objects w/ Query Parameters
// Will return all calendars if there are no query parameters
router.route("/").get((req, res) => {
  var queryObj = { ...req.query };
  Calendar.find(queryObj)
    .sort({ _id: -1 })
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
  const author = req.body.author;
  const event_type = req.body.event_type;
  const title = req.body.title;
  const description = req.body.description;
  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const timeStart = req.body.timeStart;
  const timeEnd = req.body.timeEnd;
  const slotDuration = req.body.slotDuration;
  const applicants = req.body.applicants;
  const assignees = req.body.assignees;
  const slotsInDay = req.body.slotsInDay;

  const newCalendar = new Calendar({
    author,
    event_type,
    title,
    description,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    slotDuration,
    applicants,
    assignees,
    slotsInDay,
  });

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
  Calendar.updateOne({ _id: req.params.id }, req.body)
    .then((calendar) => res.json(calendar))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
