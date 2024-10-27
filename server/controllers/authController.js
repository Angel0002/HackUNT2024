// const bcrypt = require("bcrypt");
// const User = require("../models/user");

// exports.register = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ error: "Server error during registration" });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // Redirect to the dashboard after successful login
//     res.redirect("/api/auth/dashboard"); // Redirect to the dashboard route
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Server error during login" });
//   }
// };

const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists by email or username (if unique)
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     req.session.userId = user._id; // Store user ID in session for session-based auth
//     res.json({ message: "Login successful", userId: user._id });
//     res.redirect("/api/auth/dashboard");
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Server error during login" });
// //   }
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log("Attempting login for:", email); // Log the email being checked

//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("User not found with email:", email);
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("Password does not match for user:", email);
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // Success - log in the user
//     req.session.userId = user._id;
//     res.redirect("/api/auth/dashboard");
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Server error during login" });
//   }
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    req.session.userId = user._id;
    req.session.username = user.username;

    console.log("Session after login:", req.session); // Check session info
    console.log("Redirecting to ingredients page");

    res.status(200).json({ success: true, redirectUrl: "/api/ingredients" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};
