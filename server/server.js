require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const fs = require('fs');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });



const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);



const dbURI = process.env.MONGO_URI;

console.log(dbURI);

const app = express();
const port = process.env.PORT || 3002;
const path = require('path');

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(cors());

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    profilePicture: Buffer,
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
        const { title, location, date, description } = req.body;
        const datePosted = new Date();
        const user = req.session.user;

        if (!user) {
            return res.status(401).json({ error: 'User not logged in' });
        }

        const newEvent = new Event({
            user: user.username,
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
        
        const existingUsername = await User.findOne({ username });


        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }



        const defaultProfilePicture = fs.readFileSync('./server/assets/capy.png');
        const newUser = new User({
            username,
            password,
            email,
            profilePicture: defaultProfilePicture,
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


//User login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        if (password === user.password) {
            req.session.username = username;
            return res.json({ message: 'Login successful', username });
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error logging in');
    }
});


app.get('/api/profile', (req, res) => {

    const username = req.session.username;
    if (username) {
        res.json({ username });
    } else {
        res.status(401).json({ error: 'User not logged in' });
    }
});




app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Access the uploaded file from req.file.buffer
      const imageBuffer = req.file.buffer;
  
      // Get the username of the current user from the session
      const username = req.session.username;
      if (!username) {
        return res.status(401).json({ error: 'User not logged in' });
      }
  
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the user's profile picture with the uploaded image buffer
      user.profilePicture = imageBuffer;
  
      // Save the updated user object to the database
      await user.save();
  
      res.status(200).json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      res.status(500).json({ error: 'Internal server error' });
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
