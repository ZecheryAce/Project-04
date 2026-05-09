const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/auth");

// ─────────────────────────────────────────
// GET QUESTIONS BY CATEGORY — GET /api/questions/:categoryId
// Returns all questions for a selected category
// ─────────────────────────────────────────
router.get("/:categoryId", async (req, res) => {
  const { categoryId } = req.params;

  try {
    const [questions] = await db.query(
      `SELECT questions.*, users.username 
       FROM questions 
       JOIN users ON questions.user_id = users.id 
       WHERE questions.category_id = ? 
       ORDER BY questions.created_at ASC`,
      [categoryId],
    );
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// ─────────────────────────────────────────
// POST A QUESTION — POST /api/questions
// Creates a new question (must be logged in)
// ─────────────────────────────────────────
router.post("/", authMiddleware, async (req, res) => {
  const { title, body, category_id } = req.body;
  const user_id = req.user.id;

  try {
    await db.query(
      "INSERT INTO questions (title, body, user_id, category_id) VALUES (?, ?, ?, ?)",
      [title, body, user_id, category_id],
    );
    res.status(201).json({ message: "Question posted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
