const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/auth");

// ─────────────────────────────────────────
// GET ANSWERS FOR A QUESTION — GET /api/answers/:questionId
// Returns all answers for a specific question
// ─────────────────────────────────────────
router.get("/:questionId", async (req, res) => {
  const { questionId } = req.params;

  try {
    const [answers] = await db.query(
      `SELECT answers.*, users.username 
       FROM answers 
       JOIN users ON answers.user_id = users.id 
       WHERE answers.question_id = ? 
       ORDER BY answers.created_at ASC`,
      [questionId],
    );
    res.json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// ─────────────────────────────────────────
// POST AN ANSWER — POST /api/answers
// Submits an answer to a question (must be logged in)
// ─────────────────────────────────────────
router.post("/", authMiddleware, async (req, res) => {
  const { body, question_id } = req.body;
  const user_id = req.user.id;

  try {
    await db.query(
      "INSERT INTO answers (body, user_id, question_id) VALUES (?, ?, ?)",
      [body, user_id, question_id],
    );
    res.status(201).json({ message: "Answer posted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
