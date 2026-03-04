const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ✅ Role-based access
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    // ✅ Soft delete fields
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt & updatedAt
  },
);

module.exports = mongoose.model("User", userSchema);

// const userTableQuery = `
// CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     fullname VARCHAR(200) NOT NULL,
//     username VARCHAR(50) NOT NULL UNIQUE,
//     email VARCHAR(100) NOT NULL UNIQUE,
//     password_hash VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );`;

// module.exports = userTableQuery;
