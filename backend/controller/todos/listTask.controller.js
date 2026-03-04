const Todo = require("../../model/task.model");

const getTasks = async (req, res) => {
  try {
    const user_id = req.user.id; // Get the user ID from the authentication token (assuming JWT)

    const tasks = await Todo.find({ user_id })
      .select("task is_completed priority createdAt") // Keep _id so React can use it
      .sort({ createdAt: -1 });  // Sort by date

    if (tasks.length === 0) {
      return res.status(200).json({
        message: "No tasks found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = { getTasks };
