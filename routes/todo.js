const express = require("express");
const router = express.Router();

let todos = [
    {
        id: 1,
        task: "Belajar node.js",
        complete: false
    },
    {
        id: 2,
        task: "Membuat API",
        complete: true
    },
    {
        id: 3,
        task: "Ini Adalah Data Baru",
        complete: false
    }
];

// Handle GET request to /todos
router.get('/', (req, res) => {
    res.json(todos); // Send 200 OK response with todos data
});

// POST method
router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        complete: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// DELETE method
router.delete('/:id', (req, res) => {
    const todoIndex = todos.findIndex(i => i.id === parseInt(req.params.id));
    if (todoIndex === -1) {
        return res.status(404).json({ message: "Task not found!" });
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0];
    res.status(200).json({ message: `Tugas ${deletedTodo.task} telah dihapus` });
});

// PUT method
router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message: "Tugas tidak ditemukan" });
    }

    todo.task = req.body.task || todo.task;

    res.status(200).json({
        message: `Tugas dengan ID ${todo.id} telah diperbarui`,
        updatedTodo: todo
    });
});

module.exports = router;
