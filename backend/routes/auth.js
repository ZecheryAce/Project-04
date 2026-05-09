const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

// ─────────────────────────────────────────
// REGISTER — POST /api/auth/register
// Creates a new user account
// ─────────────────────────────────────────
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const [existing] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Validate username — only letters, numbers, underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return res
        .status(400)
        .json({
          message:
            "Invalid username. Use only letters, numbers, and underscores.",
        });
    }

    // Validate password — at least 8 characters and contains a number
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 8 characters and contain a number.",
        });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database
    await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// ─────────────────────────────────────────
// LOGIN — POST /api/auth/login
// Logs in an existing user
// ─────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    // If no user found, return error
    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const user = users[0];

    // Compare the entered password with the hashed one in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Create a JWT token — this is the user's "ID badge" while logged in
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    // Send the token and username back to the frontend
    res.json({
      token,
      username: user.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
