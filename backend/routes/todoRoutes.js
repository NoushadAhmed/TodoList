// routes/todoRoutes.js
const express = require('express');
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes here are protected
router.use(authMiddleware);

// GET /todos - list todos for logged-in user
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err.message);
    res.status(500).json({ message: 'Server error while fetching todos' });
  }
});

// POST /todos - create todo for logged-in user
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== 'string') {
      return res
        .status(400)
        .json({ message: 'Title is required and must be a string' });
    }

    const newTodo = new Todo({
      title: title.trim(),
      userId: req.user.id,
    });

    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);
  } catch (err) {
    console.error('Error creating todo:', err.message);
    res.status(500).json({ message: 'Server error while creating todo' });
  }
});

// PUT /todos/:id - update todo (title and/or completed)
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { title, completed } = req.body;

    const updateData = {};
    if (typeof title === 'string') {
      updateData.title = title.trim();
    }
    if (typeof completed === 'boolean') {
      updateData.completed = completed;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: 'No valid fields to update (send title and/or completed)',
      });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error('Error updating todo:', err.message);
    res.status(500).json({ message: 'Server error while updating todo' });
  }
});

// DELETE /todos/:id - delete todo for user
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({
      message: 'Todo deleted successfully',
      deletedTodo,
    });
  } catch (err) {
    console.error('Error deleting todo:', err.message);
    res.status(500).json({ message: 'Server error while deleting todo' });
  }
});

module.exports = router;
