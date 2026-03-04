const Todo = require("../../model/task.model");

/**
 * @desc    Update an existing Todo task
 * @route   PUT /api/tasks/:id
 * @access  Private (requires authenticated user)
 */
const updateTask = async (req, res) => {
  try {
    const { id } = req.params; // MongoDB document _id
    let { task, is_completed, priority } = req.body;

    const user_id = req.user.id; // authenticated user

    // 1. Check if task exists and belongs to the logged-in user
    const existingTask = await Todo.findOne({ _id: id, user_id });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }

    // 2. Validate and normalize task (if provided)
    if (task !== undefined) {
      if (typeof task !== "string" || task.trim() === "") {
        return res.status(400).json({
          message: "Task description must be a non-empty string",
        });
      }
      existingTask.task = task.trim();
    }

    // 3. Validate and normalize priority (if provided)
    if (priority !== undefined) {
      const allowedPriorities = ["Low", "Medium", "High"];

      priority = String(priority).trim();
      priority =
        priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();

      if (!allowedPriorities.includes(priority)) {
        return res.status(400).json({
          message: "Priority must be one of: Low, Medium, High",
        });
      }

      existingTask.priority = priority;
    }

    // 4. Normalize is_completed (if provided)
    if (is_completed !== undefined) {
      existingTask.is_completed =
        typeof is_completed === "boolean" ? is_completed : false;
    }

    // 5. Save updated task
    await existingTask.save();

    // 6. Return success response
    return res.status(200).json({
      message: "Task Updated Successfully",
      data: existingTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);

    // Handle invalid MongoDB ObjectId error
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid Task ID",
      });
    }

    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = { updateTask };
