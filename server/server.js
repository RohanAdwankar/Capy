require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const dbURI = process.env.MONGO_URI;

console.log(dbURI);

const app = express();
const port = process.env.PORT || 3013;
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

app.post('/api/createUser', async (req, res) => {

    try {
        const {username, password, email} = req.body;
        
        const newUser = new User({
            username,
            password,
            email,
        });


        await newUser.save();


        res.status(201).send('User created');

        console.log("New user created");
        console.log(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }



});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {

        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }


        res.json({ message: 'Login successful', user });
        console.log("Someone logged in:");
        console.log(user);

    } catch (error) {
            console.error(error);
    }


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
