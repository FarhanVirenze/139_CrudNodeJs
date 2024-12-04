const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Import database connection

// Get all tasks
router.get('/', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.status(200).json(results);
    });
});

// Get a specific task by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM todos WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Task not found');
        res.status(200).json(results[0]);
    });
});

// Add a new task
router.post('/', (req, res) => {
    const { task } = req.body;
    if (!task || task.trim() === '') {
        return res.status(400).send('Task cannot be empty');
    }

    db.query('INSERT INTO todos (task, completed) VALUES (?, false)', [task.trim()], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        const newTodo = { id: results.insertId, task: task.trim(), completed: false };
        res.status(201).json(newTodo);
    });
});

// Update an existing task
router.put('/:id', (req, res) => {
    const { task, completed } = req.body;

    db.query('UPDATE todos SET task = ?, completed = ? WHERE id = ?', [task, completed, req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Task not found');
        res.status(200).json({ message: 'Task successfully updated', updatedTodo: { id: req.params.id, task, completed } });
    });
});

// Delete a task
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM todos WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Task not found');
        res.status(200).json({ message: `Task with ID ${req.params.id} has been deleted` });
    });
});

module.exports = router;
