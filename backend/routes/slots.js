const router = require("express").Router();
let Slot = require("../models/slot.model");
var cors = require("cors");
router.use(cors());

// GET - get all slots
router.route("/").get((req, res) => {
    Slot.find()
      .then((slots) => res.json(slots))
      .catch((err) => res.status(400).json("Error: " + err));
  });

// POST - add new slots
router.route("/").post((req, res) => {
    const date = req.body.date;
    const time = req.body.time;
    const interviewees = req.body.interviewees;
    const interviewers = req.body.interviewers;
  
    const newSlot = new Slot ({
        date,
        time,
        interviewees,
        interviewers
    });
  
    newSlot
      .save()
      .then(() => res.json(newSlot))
      .catch((err) => res.status(400).json("Error: " + err));
  });

// DELETE - delete slot by ID
router.route("/:id").delete((req, res) => {
    // delete by ID
    Slot.findByIdAndDelete(req.params.id)
      .then(() => res.json(`Slot with id ${req.params.id} deleted.`))
      .catch((err) => res.status(400).json("Error: " + err)); // 500 might be better
  });

// GET - get slot by ID
router.route("/:id").get((req, res) => {
    const slot = Slot.find(req.params.id);
    res.status(200).json(slot);
  }); 

// router.route("/").get((req, res) => {
//   res.send("You're at the Slots endpoint");
// });

module.exports = router;