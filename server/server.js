require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const dbURI = process.env.MONGO_URI;

console.log(dbURI);

const app = express();
const port = process.env.PORT || 3007;
const path = require('path');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
});

const eventSchema = new mongoose.Schema({
    user: String,
    title: String,
    location: String,
    date: Date,
    description: String,
    datePosted: Date,
});

const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);

// Middleware
app.use(bodyParser.json());

const db = mongoose.connection;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

app.post('/api/createEvent', async (req, res) => {
    try {
        const { user, title, location, date, description } = req.body;
        const datePosted = new Date();
        const newEvent = new Event({
            user,
            title,
            location,
            date,
            description,
            datePosted
        });
        await newEvent.save();
        res.status(201).send('Event created');
        console.log("Someone created an event:");
        console.log(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating event');
    }
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
    const {username, password} = req.body;

    const user = userSchema.find(u => u.username === username);

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }


    res.json({ message: 'Login successful', user: user });
    console.log("Someone logged in:");
    console.log(user);
});

//API Endpoint
app.use(cors());
app.use(express.json());

app.get('/api/events', async (req, res) => {
    try{
        const events = await Event.find();
        res.json(events);
    } catch(err){
        res.status(500).json({message: err.message})
    }
});

app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
