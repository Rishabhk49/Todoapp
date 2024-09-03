// backend/models/Todo.js
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", todoSchema);
