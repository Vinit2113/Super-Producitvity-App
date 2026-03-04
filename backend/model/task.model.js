const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    is_completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  { timestamps: true }, // adds createdAt and updatedAt
);

module.exports = mongoose.model("Todo", todoSchema);

// const taskTableQuery = `
// CREATE TABLE todos (
//     id BIGINT NOT NULL, -- Matches Date.now() from your React code
//     user_id INT NOT NULL,
//     task_text VARCHAR(255) NOT NULL,
//     is_completed BOOLEAN DEFAULT FALSE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     PRIMARY KEY (id),
//     -- Links todo to a specific user
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// );
// `;

// module.exports = taskTableQuery;
