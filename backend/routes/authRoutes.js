const express = require("express");
const {
  signUpSchema,
  signInSchema,
} = require("../lib/validators/auth-validators");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * Sign Up
 */
authRouter.post("/sign-up", async (req, res) => {
  // Validate body
  const user = signUpSchema.safeParse(req.body);
  console.log(user);
  if (!user.success) {
    return res.status(400).json(user);
  }
  // get name, email and password from body
  const { name, email, password } = user.data;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    return res
      .status(201)
      .json({
        message: "User registration successfull",
        user: { name: name, email: email },
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error occured", details: err.message });
  }
});

/**
 * Sign In
 */
authRouter.post("/sign-in", async (req, res) => {
  // Validate body
  const userCreds = signInSchema.safeParse(req.body);
  console.log(userCreds);
  if (!userCreds.success) {
    return res.status(400).json(userCreds);
  }
  // get email and password from body
  const { email, password } = userCreds;

  try {
    // Find Email in body
    const user = await User.findOne({ email: email });
  } catch (err) {
    return res.status(401).json({ message: "Invalid Credentials", user: null });
  }

  // Check if user and passwer exist
  if (user && user.password) {
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (isPasswordMatch) {
      console.log("JWT_SECRET", JWT_SECRET);

      // Create JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      // Setting Cookie
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.json({
        message: "Login Successfull",
        user: { name: user.name, email: user.email },
      });
    }
  }
  return res.status(401).json({ message: "Invalid Credentials", user: null });
});

/**
 * Sign Out
 */
authRouter.post("/sign-out", (req, res) => {
  res.clearCookie("access_token");
  res.json({ message: "successfully logged out." });
});

module.exports = authRouter;
