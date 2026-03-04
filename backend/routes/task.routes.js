const express = require("express");
const { createTask } = require("../controller/todos/createTask.controller");
const verifyToken = require("../middleware/auth.middleware");
const { updateTask } = require("../controller/todos/updateTask.controller");
const { getTasks } = require("../controller/todos/listTask.controller");
const { deleteTask } = require("../controller/todos/deleteTask.controller");

const router = express.Router();

router.post("/create", verifyToken, createTask);
router.get("/list", verifyToken, getTasks);
router.put("/update/:id", verifyToken, updateTask);
router.delete("/delete/:id", verifyToken, deleteTask);

module.exports = router;
