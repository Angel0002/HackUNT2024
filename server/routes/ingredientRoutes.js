// server/routes/ingredientRoutes.js
const express = require("express");
const router = express.Router();
const Ingredient = require("../models/ingredient"); // Ensure the path is correct

// Route to render the ingredients page with data
router.get("/ingredients", async (req, res) => {
  try {
    if (!req.session.userId || !req.session.username) {
      console.error("Error: Missing userId or username in session.");
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
    const ingredients = await Ingredient.find({}); // Fetch all ingredients from MongoDB
    res.render("ingredients", { ingredients }); // Render ingredients.ejs and pass ingredients data
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).send("Server error while fetching ingredients");
  }
});

module.exports = router;
