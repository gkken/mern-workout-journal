const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/workouts", workoutRoutes);

app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening at ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
