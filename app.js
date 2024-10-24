const express = require('express');
const path = require('path');
const app = express();
const todoRouter = require('./routes/todo'); // Menggunakan router todo

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk melayani file statis seperti CSS
app.use(express.static(path.join(__dirname, 'public')));

// Menggunakan router untuk /todo
app.use('/todo', todoRouter);

// Route untuk halaman home
app.get('/', (req, res) => {
    res.render('index'); // Menggunakan view "index.ejs"
});

// Route untuk halaman contact
app.get('/contact', (req, res) => {
    res.render('contact'); // Menggunakan view "contact.ejs"
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
