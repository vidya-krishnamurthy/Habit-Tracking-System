// habitModel.js
const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'signup', required: true },
  name: { type: String, required: true },
  goal: { type: Number, required: true },
  frequency: { type: String, required: true },
  timeOfDay: { type: String, required: true },
  startDate: { type: Date, required: true },
  reminders: { type: String }
});

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;

