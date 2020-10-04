const mongoose = require("mongoose");

const TasksSchema = mongoose.Schema({
  name: { type: String, required: false },
  tasks: { type: Array, required: false },
});

const Task = (module.exports = mongoose.model("Task", TasksSchema, "Tasks"));
