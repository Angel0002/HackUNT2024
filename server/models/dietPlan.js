const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
  day: String,
  meals: {
    breakfast: String,
    lunch: String,
    dinner: String,
  },
});

const DietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true }, // Remove `unique: true` if it exists here
  goal: String,
  days: [DaySchema], // Each day with breakfast, lunch, dinner
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DietPlan", DietPlanSchema);
