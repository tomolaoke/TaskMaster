const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const authenticateToken = require('../middleware/auth'); // Import the authentication middleware

// Create Task (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
    const { title, description, deadline, priority } = req.body;
    const userId = req.user._id; // Get userId from the authenticated user

    try {
        const taskData = { title, description, deadline, priority, user: userId };
        const newTask = new Task(taskData);
        const savedTask = await newTask.save();

        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ message: 'Error creating task', error: err.message });
    }
});

// Get All Tasks for a User (requires authentication)
router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user._id; // Get userId from the authenticated user

    try {
        const tasks = await Task.find({ user: userId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving tasks', error: err.message });
    }
});

// Update Task (requires authentication and authorization)
router.put('/:taskId', authenticateToken, async (req, res) => {
    const { taskId } = req.params;
    const updates = req.body;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this task' });
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task', error: err.message });
    }
});

// Delete Task (requires authentication and authorization)
router.delete('/:taskId', authenticateToken, async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this task' });
        }

        await Task.findByIdAndDelete(taskId);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task', error: err.message });
    }
});

module.exports = router;
