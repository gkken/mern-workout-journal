const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workout");
const requireAuth = require("../middlewares/requireAuth");

router.use(requireAuth);

router.get("/", getAllWorkouts);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
