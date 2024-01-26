// authMiddleware.js
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Customer = require("../models/customerModel"); // Import the customer model

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the decoded token corresponds to an admin or customer
      if (decoded.role === "admin") {
        req.user = await User.findById(decoded.id).select("-password");
      } else if (decoded.role === "customer") {
        req.user = await Customer.findById(decoded.id).select("-password");
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
