const userModel = require("../../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { fullname, username, email, password, role } = req.body;

    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser && !existingUser.isDeleted) {
      // Active user already exists
      return res.status(400).json({ error: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let user;
    if (existingUser && existingUser.isDeleted) {
      // Reactivate deleted user
      existingUser.fullname = fullname;
      existingUser.username = username;
      existingUser.password = hashedPassword;
      existingUser.role = role || "user";
      existingUser.isDeleted = false;

      user = await existingUser.save();
    } else {
      // Create new user
      const newUser = new userModel({
        fullname,
        username,
        email,
        password: hashedPassword,
        role: role || "user",
      });

      user = await newUser.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Set HttpOnly cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    res.status(201).json({
      message: existingUser?.isDeleted
        ? "User reactivated successfully"
        : "User registered successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = register;
