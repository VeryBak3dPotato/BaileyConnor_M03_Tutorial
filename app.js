const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


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
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('New Request Made:');
    console.log('Host: ', req.hostname);
    console.log('Path: ', req.path);
    console.log('Method: ', req.method);
    next();
});


// Mongoose & MongoDB Tests
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog',
        snippet: 'About my new blog',
        body: 'More about my new blog'
    })

    blog.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('679fdea747861a3d79fdf466')
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


// Blog Routes
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { blogs: result, title: 'All blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});


// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});