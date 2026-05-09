const jwt = require("jsonwebtoken");

// This function runs before protected routes
// It checks if the user has a valid login token
module.exports = (req, res, next) => {
  // Get the token from the request header
  const authHeader = req.headers["authorization"];

  // If no token was sent, deny access
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No token provided. Please log in." });
  }

  // The token comes as "Bearer <token>" so we split it to get just the token
  const token = authHeader.split(" ")[1];

  // Verify the token is valid and not expired
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid token. Please log in again." });
    }

    // Token is valid — attach the user info to the request
    req.user = decoded;

    // Move on to the actual route
    next();
  });
};
