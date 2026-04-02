const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { addTask, getTasks, updateTask, deleteTask } = require("../controller/task.controller");

router.post("/add-task", auth, addTask);
router.get("/tasks", auth, getTasks);
router.put("/update-task/:id", auth, updateTask);
router.delete("/delete-task/:id", auth, deleteTask);

module.exports = router;