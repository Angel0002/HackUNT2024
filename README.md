**NutriSmart**
## Inspiration
NutriSmart was born out of the everyday challenge of planning meals that meet personal health goals. We wanted to take the hassle out of figuring out balanced, goal-oriented meal plans by automating it with AI, saving people time and helping them stay on track.
## What it does
NutriSmart is a 7-day meal planner that generates custom meal plans based on each user’s goals, favorite ingredients, and dietary needs. It creates balanced, easy-to-follow meal ideas to help people achieve their health goals with zero planning effort.

## How we built it
We combined OpenAI’s GPT-3.5 to generate meal ideas, MongoDB to store user preferences, and Node.js for handling backend processes. The user-friendly front end is built with HTML, CSS, and JavaScript, making it simple to enter preferences and instantly receive tailored meal plans.

## Challenges we ran into
One of our biggest challenges was fine-tuning the AI to generate meal plans that felt truly personalized for specific dietary goals, while keeping each plan fresh and interesting. We initially planned to use OAuth for user authentication, but after running into some integration roadblocks, we pivoted to JWT tokens, which ended up being a simpler, more secure choice. Balancing multiple dietary preferences seamlessly also proved tricky, but we found creative ways to make the app adaptable to a wide range of dietary needs.

## Accomplishments that we're proud of
Creating a fully automated, personalized meal planner that’s simple to use and adaptable for various dietary goals was a huge win. We’re proud that NutriSmart can make a real difference in people’s day-to-day lives.

## What we learned

Building NutriSmart taught us how to balance AI’s power with practical nutritional needs. We refined the AI to create balanced, goal-oriented meals aligned with real dietary guidelines and learned how to simplify complex data into clear, user-friendly meal plans. Adapting the app for diverse dietary preferences highlighted the importance of designing inclusive experiences. Along the way, we also implemented MongoDB Atlas for efficient, scalable data management, allowing us to securely store user data and meal plans in the cloud. Shifting from OAuth to JWT tokens further streamlined secure login, ensuring simplicity without compromising security.

## What's next for NutriSmart: Your AI-Powered Meal Planner
We’re aiming to make NutriSmart even smarter and more adaptable. Next steps include adding dietary goals for specific health conditions (like diabetes and heart health) and creating advanced customization options, such as macronutrient targeting and global cuisine preferences. A mobile app is in the works to offer meal planning on the go, integrating with wearable devices to adjust meals based on activity levels and health data. Ultimately, NutriSmart will evolve into a complete digital nutrition assistant, adapting meal plans in real-time to help users easily meet their unique wellness goals.
