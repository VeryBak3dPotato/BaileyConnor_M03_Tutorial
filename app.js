const express = require('express');
const morgan = require('morgan');

// Express App
const app = express();

// Listen For Requests
app.listen(3000);

// Register View Engine
app.set('view engine', 'ejs');

// Middleware & Static Files
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('New Request Made:');
    console.log('Host: ', req.hostname);
    console.log('Path: ', req.path);
    console.log('Method: ', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('In the next middleware...');
    next();
});

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// Routes
app.get('/', (req, res) => {
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});