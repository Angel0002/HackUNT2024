const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { authenticateSession } = require("../middleware/authMiddleware");
const path = require("path");

// Debug helper function to log endpoint access
const logRequest = (req) => {
  console.log(`Received ${req.method} request at ${req.originalUrl}`);
};

router.get("/login", (req, res) => {
  const loginPagePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "login.html"
  );

  res.sendFile(loginPagePath, (err) => {
    if (err) {
      console.error("Error serving login page:", err.message);
      res.status(500).send("Error loading the login page");
    }
  });
});
// Serve register page
router.get("/register", (req, res) => {
  logRequest(req); // Log for debugging
  res.sendFile(path.join(__dirname, "../../public/register.html"), (err) => {
    if (err) {
      console.error("Error serving register page:", err);
      res.status(500).send("Error loading the register page");
    }
  });
});

// Registration route (POST)
router.post("/register", async (req, res, next) => {
  logRequest(req); // Log for debugging
  try {
    await register(req, res);
  } catch (error) {
    console.error("Error in registration:", error);
    next(error);
  }
});

// Login route (POST)
// router.post("/login", async (req, res, next) => {
//   logRequest(req); // Log for debugging
//   try {
//     await login(req, res);
//     // res.redirect("/dashboard");
//   } catch (error) {
//     console.error("Error in login:", error);
//     next(error);
//   }
// });
router.post("/login", async (req, res, next) => {
  logRequest(req); // Log for debugging
  try {
    await login(req, res); // login function now handles the response, so no redirect needed here
  } catch (error) {
    console.error("Error in login:", error);
    next(error);
  }
});

// Dashboard route (without authentication)
// router.get("/dashboard", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../public/dashboard.html"));
// });
router.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/dashboard.html"));
});
// Dashboard route (protected with session-based authentication)
// router.get("/dashboard", authenticateSession, (req, res) => {
//   logRequest(req); // Log for debugging
//   res.sendFile(path.join(__dirname, "../../public/dashboard.html"), (err) => {
//     if (err) {
//       console.error("Error serving dashboard page:", err);
//       res.status(500).send("Error loading the dashboard page");
//     }
//   });
// });

// Middleware to handle errors more gracefully
router.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = router;
