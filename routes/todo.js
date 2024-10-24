const express = require("express");
const router = express.Router();

let todo = [
    {
        id: 1,
        task: "Belajar node.js",
        complete: false
    },
    {
        id: 2,
        task: "Membuat API",
        complete: true
    }
];

// Menangani GET request ke /todo
router.get('/', (req, res) => {
    res.status(200).json(todo); // Mengirim response dengan status 200 OK dan data todo
});

module.exports = router;
