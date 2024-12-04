const express = require('express');
const router = express.Router();

let todos = [
    { id: 1, task: "Learn Node.js", complete: false },
    { id: 2, task: "Build an API", complete: true },
    { id: 3, task: "Create sample data", complete: false }
];

// Get all tasks
router.get('/', (req, res) => {
    res.json(todos);
});

// Add a new task
router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        complete: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a task
router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Task not found');
    todo.task = req.body.task || todo.task;
    res.json({ message: 'Task updated', updatedTodo: todo });
});

// Delete a task
router.delete('/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Task not found');
    const deleted = todos.splice(index, 1);
    res.json({ message: `Task "${deleted[0].task}" deleted` });
});

module.exports = router;
