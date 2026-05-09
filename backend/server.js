// Load environment variables
require("dotenv").config();

// Import packages
const express = require("express");
const cors = require("cors");

// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import and use routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/answers", require("./routes/answers"));

// Base test route
app.get("/", (req, res) => {
  res.json({ message: "PlanetsQA backend is running!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
