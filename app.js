const express = require('express');
const path = require('path');
const app = express();
const todoRouter = require('./routes/tododb.js'); // Importing the todo router
require('dotenv').config();
const port = process.env.PORT;

const expressLayout = require('express-ejs-layouts');

const db = require('./database/db');

app.use(expressLayout);

app.use(express.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// Use the todo router for /todo routes
app.use('/todo', todoRouter);

// Route for the home page
app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layout'
    }); // Renders the "index.ejs" view
});

// Route for the contact page
app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main-layout'
    }); // Renders the "contact.ejs" view
});

app.get('/todo-view', (req, res) => {
    db.query('SELECT * FROM todos', (err, todos) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('todo', {
            layout: 'layouts/main-layout',
            todos: todos
        });
    });
});

// Handle undefined routes
app.use((req, res) => {
    res.status(404).send("Page not found!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
