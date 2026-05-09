const express = require("express");
const router = express.Router();
const db = require("../db");

// ─────────────────────────────────────────
// GET ALL CATEGORIES — GET /api/categories
// Returns all planet categories
// ─────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const [categories] = await db.query(
      "SELECT * FROM categories ORDER BY name ASC",
    );
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
