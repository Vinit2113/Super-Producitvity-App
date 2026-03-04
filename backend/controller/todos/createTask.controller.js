const Todo = require("../../model/task.model");

/**
 * @desc    Create a new Todo task
 * @route   POST /api/tasks
 * @access  Private (requires authenticated user)
 */
const createTask = async (req, res) => {
  try {
    // 1. Extract task details from request body
    let { task, is_completed, priority } = req.body;
    console.log(task);

    const user_id = req.user.id; // assume user is authenticated and req.user exists

    // 2. Input validation and normalization
    if (!task || typeof task !== "string" || task.trim() === "") {
      return res.status(400).json({
        message: "Task description is required and must be a non-empty string",
      });
    }
    task = task.trim(); // remove leading/trailing whitespace

    // 3. Validate and normalize priority
    const allowedPriorities = ["Low", "Medium", "High"];
    priority = priority ? String(priority).trim() : "Medium"; // ensure it's a string and trimmed
    priority =
      priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase(); // normalize case
    if (!allowedPriorities.includes(priority)) {
      return res
        .status(400)
        .json({ message: "Priority must be one of: Low, Medium, High" });
    }

    // 4. Normalize is_completed to boolean
    is_completed = typeof is_completed === "boolean" ? is_completed : false;

    // 5. Create the task in the database
    const newTask = new Todo({
      task,
      priority,
      user_id, // Link the task to the logged-in user
      is_completed: false,
    });

    await newTask.save();

    // 6. Return success response with the created task
    return res.status(201).json({
      message: "Todo Created Successfully",
      data: newTask,
    });
  } catch (error) {
    // 7. Log error for debugging
    console.error("Error creating task:", error);

    // 8. Return internal server error response
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

module.exports = { createTask };
