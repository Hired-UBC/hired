const router = require("express").Router();
let Calendar = require("../models/calendar.model");
var cors = require("cors");
router.use(cors());

// GET - all calendars
router.route("/").get((req, res) => {
  Calendar.find()
    .then((calendars) => res.json(calendars))
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET - calander by id
router.route("/:id").get((req, res) => {
  const calander = Calendar.find(req.params.id);
  res.status(200).json(calander);
}); 

// POST - add new calander
router.route("/").post((req, res) => {
  const author = req.body.author;
  const event_type = req.body.event_type;
  const description = req.body.description;
  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const timeStart = req.body.timeStart;
  const timeEnd = req.body.timeEnd;
  const slotDuration = req.body.slotDuration;
  const assignees = req.body.assignees;

  const newCalendar = new Calendar ({
    author,
    event_type,
    description,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    slotDuration,
    assignees,
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

module.exports = router;
