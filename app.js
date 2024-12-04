const express = require('express');
const path = require('path');
const app = express();
const todoRouter = require('./routes/tododb'); // Importing database-connected Todo router
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middlewares/middleware');
const expressLayout = require('express-ejs-layouts');
require('dotenv').config();
const db = require('./database/db');

const port = process.env.PORT || 3000;

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayout);

// Configure express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Set static file path
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Auth Routes
app.use('/', authRoutes);

// Todo Routes (Database Integration)
app.use('/todo', todoRouter);

// Home Route
app.get('/', isAuthenticated, (req, res) => {
    res.render('index', { layout: 'layouts/main-layout' });
});

// Contact Route
app.get('/contact', isAuthenticated, (req, res) => {
    res.render('contact', { layout: 'layouts/main-layout' });
});

// Todo View Page
app.get('/todo-view', isAuthenticated, (req, res) => {
    db.query('SELECT * FROM todos', (err, todos) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('todo', { layout: 'layouts/main-layout', todos });
    });
});

// Handle undefined routes
app.use((req, res) => {
    res.status(404).send('Page not found!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
