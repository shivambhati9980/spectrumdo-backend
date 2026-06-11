const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.tasks || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add task
router.post('/', auth, async (req, res) => {
  try {
    const { text, description, priority, category, dueDate } = req.body;
    
    const user = await User.findById(req.userId);
    user.tasks.push({
      text,
      description: description || '',
      priority: priority || 'Medium',
      category: category || 'Personal',
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date()
    });
    
    await user.save();
    res.status(201).json(user.tasks[user.tasks.length - 1]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update task
router.put('/:taskId', auth, async (req, res) => {
  try {
    const { text, description, priority, category, dueDate, completed } = req.body;
    
    const user = await User.findById(req.userId);
    const task = user.tasks.id(req.params.taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    if (text !== undefined) task.text = text;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (category !== undefined) task.category = category;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (completed !== undefined) task.completed = completed;
    
    await user.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete task
router.delete('/:taskId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.tasks.pull({ _id: req.params.taskId });
    await user.save();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle task completion
router.patch('/:taskId/toggle', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const task = user.tasks.id(req.params.taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    task.completed = !task.completed;
    await user.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;