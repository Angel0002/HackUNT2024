const express = require("express");
const router = express.Router();
const DietPlan = require("../models/dietPlan");
const Ingredient = require("../models/ingredient");
const { generateDietPlan } = require("../controllers/dietPlanController");

router.post("/createMealPlan", async (req, res) => {
  if (!req.session.userId || !req.session.username) {
    console.error("Error: Missing userId or username in session.");
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  const { goal, ingredients } = req.body;
  const userId = req.session.userId; // Retrieve userId from session
  const username = req.session.username; // Retrieve username from session

  console.log("Creating diet plan for:", { userId, username });

  try {
    // Fetch ingredient names using IDs
    const ingredientDocs = await Ingredient.find({ _id: { $in: ingredients } });
    const ingredientNames = ingredientDocs.map((ingredient) => ingredient.name);

    // Generate diet plan using ingredient names
    const parsedDietPlan = await generateDietPlan({
      goal,
      ingredients: ingredientNames,
    });

    if (!userId) {
      console.error("Error: userId is undefined.");
      return res.status(400).json({ error: "Server error: Missing user ID." });
    }

    // Create and save diet plan with userId and username
    const dietPlan = new DietPlan({
      userId: userId,
      username: username,
      goal,
      days: parsedDietPlan,
    });

    await dietPlan.save();

    return res.status(200).json({
      message: "Meal plan created successfully!",
      dietPlan: parsedDietPlan,
    });
  } catch (error) {
    console.error("Error creating and saving meal plan:", error);
    return res
      .status(500)
      .json({ error: "Server error while creating meal plan." });
  }
});
router.get("/dietPlan", async (req, res) => {
  try {
    // Replace 'user1' with the actual logged-in user ID or username
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).send("Unauthorized. Please log in.");
    }

    // Fetch the diet plan from the database for the user
    const dietPlan = await DietPlan.findOne({ userId });

    if (!dietPlan) {
      return res.status(404).send("No diet plan found for the user.");
    }

    // Render the EJS template and pass the diet plan data
    res.render("dietPlan", { dietPlan: dietPlan.days });
  } catch (error) {
    console.error("Error fetching diet plan:", error);
    res.status(500).send("Server error while fetching diet plan.");
  }
});

module.exports = router;
