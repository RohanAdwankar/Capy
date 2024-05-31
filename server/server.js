const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3006;
const path = require('path');

// Middleware
app.use(bodyParser.json());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

app.post('/api/createEvent', (req, res) => {
    const event = {
        user: req.body.user,
        title: req.body.title,
        location: req.body.location,
        date: req.body.date,
        description: req.body.description,
    };
    res.send('Event created');
    console.log("Someone created an event:");
    console.log(event);
});

app.post('/api/createUser', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    };
    res.send('User created');
    console.log("Someone created a user:");
    console.log(user);
});

app.post('/api/login', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    res.send('User logged in');
    console.log("Someone logged in:");
    console.log(user);
});

app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
