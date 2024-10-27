const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // URL to the ingredient image
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient;
