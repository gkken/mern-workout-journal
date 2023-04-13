const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;

  try {
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such workout" });

  try {
    const workout = await Workout.findById(id);

    if (!workout) return res.status(404).json({ error: "No workout found" });

    res.status(200).json({ workout });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createWorkout = async (req, res) => {
  const user_id = req.user._id;
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({
      title,
      load,
      reps,
      user_id,
    });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such workout" });

  try {
    await Workout.findOneAndDelete({ _id: id });
    const workout = await Workout.findById(id);

    if (!workout)
      return res.status(200).json({ message: "workout successfully deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such workout" });

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!workout) return res.status(404).json({ error: "no such workout" });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
