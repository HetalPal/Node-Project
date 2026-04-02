const Task = require("../model/task.model");

// CREATE
exports.addTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      msg: "Task Added",
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Add Task Error",
      error: error.message,
    });
  }
};

// READ
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    res.status(200).json({
      success: true,
      tasks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Fetch Error",
      error: error.message,
    });
  }
};

// UPDATE
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        msg: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Task Updated",
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Update Error",
      error: error.message,
    });
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        msg: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Task Deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Delete Error",
      error: error.message,
    });
  }
};