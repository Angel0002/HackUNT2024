// // parseDietPlan.js

// function parseDietPlan(dietText) {
//   const days = dietText.split("\n\n"); // Split by double newline to separate days

//   return days.map((dayText) => {
//     const [day, ...meals] = dayText.split("\n"); // Separate day name and meal descriptions

//     const mealEntries = meals.reduce((acc, meal) => {
//       if (meal.toLowerCase().includes("breakfast:")) {
//         acc.breakfast = meal.replace(/-?\s*Breakfast:/i, "").trim();
//       } else if (meal.toLowerCase().includes("lunch:")) {
//         acc.lunch = meal.replace(/-?\s*Lunch:/i, "").trim();
//       } else if (meal.toLowerCase().includes("dinner:")) {
//         acc.dinner = meal.replace(/-?\s*Dinner:/i, "").trim();
//       }
//       return acc;
//     }, {});

//     return {
//       day: day.trim(),
//       meals: mealEntries,
//     };
//   });
// }

// module.exports = parseDietPlan;
function parseDietPlan(dietText) {
  const days = dietText.split("\n\n"); // Split by double newline, assuming this separates each day

  return days
    .map((dayText) => {
      const [day, ...meals] = dayText.split("\n"); // Split day name from meal lines

      // Only process if day starts with "Day" (e.g., "Day 1:", "Day 2:")
      if (!day.trim().startsWith("Day")) {
        return null; // Skip this entry as it's not a valid day
      }

      const mealEntries = meals.reduce((acc, meal) => {
        if (meal.includes("Breakfast:")) {
          acc.breakfast = meal.replace("Breakfast:", "").trim();
        } else if (meal.includes("Lunch:")) {
          acc.lunch = meal.replace("Lunch:", "").trim();
        } else if (meal.includes("Dinner:")) {
          acc.dinner = meal.replace("Dinner:", "").trim();
        }
        return acc;
      }, {});

      return {
        day: day.trim(),
        meals: mealEntries,
      };
    })
    .filter((entry) => entry !== null); // Filter out any null entries
}

module.exports = parseDietPlan;
