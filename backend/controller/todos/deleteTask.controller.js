const Todo = require("../../model/task.model");

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const deletedTask = await Todo.findOneAndDelete({
      _id: id,
      user_id,
    });

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }
    return res.status(200).json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

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

module.exports = { deleteTask };
