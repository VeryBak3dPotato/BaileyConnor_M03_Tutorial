const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


// Express App
const app = express();


// Connect to MongoDB
const dbURI = 'mongodb+srv://cbailey138:vW6TfYXn8Lz5Pf3mM0QX@nodejstutorial.zyfzn.mongodb.net/node-js-tutorial?retryWrites=true&w=majority&appName=nodejstutorial';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));


// Register View Engine
app.set('view engine', 'ejs');


// Middleware & Static Files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});


// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


// Blog Routes
app.use('/blogs', blogRoutes);


// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});