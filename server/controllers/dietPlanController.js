// dietPlanController.js
const axios = require("axios");
const parseDietPlan = require("../utils/parseDietPlan");

exports.generateDietPlan = async ({ goal, ingredients }) => {
  try {
    const prompt = `Create a 7-day meal plan with the goal of ${goal}. Use the following ingredients: ${ingredients.join(
      ", "
    )}.`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const dietText = response.data.choices[0]?.message?.content;
    console.log("OpenAI Diet Text:", dietText);

    if (dietText) {
      const parsedDietPlan = parseDietPlan(dietText); // Use imported parseDietPlan
      console.log("Parsed Diet Plan:", JSON.stringify(parsedDietPlan, null, 2));
      return parsedDietPlan;
    } else {
      throw new Error("Failed to retrieve diet plan from API response.");
    }
  } catch (error) {
    console.error(
      "Error in generateDietPlan:",
      error.response?.data || error.message
    );
    throw error;
  }
};
