// backend/routes/todos.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo"); // Assuming you have a Todo model set up

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single todo by ID
router.get("/:id", getTodo, (req, res) => {
  res.json(res.todo);
});

// POST a new todo
router.post("/", async (req, res) => {
  const todo = new Todo({
    task: req.body.task,
    dueDate: req.body.dueDate,
    completed: req.body.completed || false,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH to update a todo
router.patch("/:id", getTodo, async (req, res) => {
  if (req.body.task != null) {
    res.todo.task = req.body.task;
  }
  if (req.body.dueDate != null) {
    res.todo.dueDate = req.body.dueDate;
  }
  if (req.body.completed != null) {
    res.todo.completed = req.body.completed;
  }

  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a todo
router.delete("/:id", getTodo, async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id }); // Deletes the document by its ID
    res.json({ message: "Deleted Todo" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Middleware function to get a todo by ID
async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: "Cannot find todo" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.todo = todo;
  next();
}

module.exports = router;
