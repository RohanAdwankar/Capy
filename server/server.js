require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const dbURI = process.env.MONGO_URI;

console.log(dbURI);

const app = express();
const port = process.env.PORT || 3002;
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

//API Endpoint


const corsOptions = {
    origin: (origin, callback) => {
      const allowedOrigins = [
        /^http:\/\/localhost:\d{4}$/, // Matches localhost with any 4-digit port number
        "https://capy-rohanadwankars-projects.vercel.app"
      ];
      
      if (!origin || allowedOrigins.some(pattern => typeof pattern === 'string' ? pattern === origin : pattern.test(origin))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };
  

app.use(cors(corsOptions));
app.use(express.json());

const db = mongoose.connection;
mongoose.connect(dbURI, { useUnifiedTopology: true });
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
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    res.send('User logged in');
    console.log("Someone logged in:");
    console.log(user);
});

app.get('/api/events', async (req, res) => {
    try{

        const events = await Event.find();
        console.log(events);

        res.status(200).json(events);
        // res.status(200).send(["you got it"]);
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
