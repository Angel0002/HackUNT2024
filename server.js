const express = require("express");
const session = require("express-session");
const path = require("path");

const connectDB = require("./server/utils/db");
const authRoutes = require("./server/routes/authRoutes");
const dietRoutes = require("./server/routes/dietPlanRoutes");
const ingredientRoutes = require("./server/routes/ingredientRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.static(path.join(__dirname, "public")));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "hompage.html"));
});
// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", authRoutes);

app.use("/api", dietRoutes);
app.use("/api", ingredientRoutes);

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Failed to log out." });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
