// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_TOKEN || "your_jwt_secret_key";

// exports.authenticateToken = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: "Invalid token." });
//   }
// };

const authenticateSession = (req, res, next) => {
  console.log("Checking session authentication..."); // Debugging log
  if (req.session && req.session.isAuthenticated) {
    console.log("Session authenticated successfully.");
    next(); // User is authenticated, proceed to the next middleware
  } else {
    console.log("Session authentication failed.");
    res.status(401).send("Unauthorized: Please log in."); // Redirect or respond with an error
  }
};

module.exports = { authenticateSession };
