require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const fs = require("fs");

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const crypto = require("crypto");
const bcrypt = require("bcrypt");

const secretKey = crypto.randomBytes(32).toString("hex");
console.log("Generated Secret Key:", secretKey);

const dbURI = process.env.MONGO_URI;

const app = express();
const port = process.env.PORT || 3002;
const path = require("path");

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  profilePicture: Buffer,
  friends: [{ type: String }],
  myEvents: [{ type: String }],
  signedUpEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

const eventSchema = new mongoose.Schema({
  user: String,
  title: String,
  location: String,
  date: Date,
  description: String,
  datePosted: Date,
  eventImage: Buffer,
  usersGoing: [{ type: String }],
  usersLiked: [{ type: String }],
});

const User = mongoose.model("User", userSchema);
const Event = mongoose.model("Event", eventSchema);

// Middleware
app.use(bodyParser.json());

//API Endpoint

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      /^http:\/\/localhost:\d{4}$/, // Matches localhost with any 4-digit port number
      "https://capy-rohanadwankars-projects.vercel.app",
    ];

    if (
      !origin ||
      allowedOrigins.some((pattern) =>
        typeof pattern === "string" ? pattern === origin : pattern.test(origin)
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

const db = mongoose.connection;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to the database");
});

app.post("/api/likeEvent", async (req, res) => {
  try {
    const { eventID } = req.body;
    const username = req.session.username;
    if (!username) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const event = await Event.findById(eventID);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (!event.usersLiked.includes(username)) {
      event.usersLiked.push(username);
      console.log("list of users who liked this event:", event.usersLiked);
      await event.save();
    }
    res.status(200).json({ message: "You liked this event!" });
    ("");
  } catch (error) {
    console.error(error);
    res.status(500).send("Sorry Error liking this event");
  }
});

app.post("/api/likeEventUndo", async (req, res) => {
  try {
    const { eventID } = req.body;
    const username = req.session.username;
    if (!username) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const event = await Event.findById(eventID);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (event.usersLiked.includes(username)) {
      const userIndex = event.usersLiked.indexOf(username);
      event.usersLiked.splice(userIndex, 1);
      console.log("list of users who liked this event:", event.usersLiked);
      await event.save();
    }
    res.status(200).json({ message: "You unliked this event!" });
    ("");
  } catch (error) {
    console.error(error);
    res.status(500).send("Sorry Error unliking this event");
  }
});

app.post("/api/createEvent", upload.single("image"), async (req, res) => {
  try {
    const { title, location, date, description, likes } = req.body;
    const datePosted = new Date();
    const user = req.session.username;

    if (!user) {
      return res.status(500).json({ error: "User not logged in" });
    }

    // Check if an image file was uploaded
    const eventImage = req.file
      ? req.file.buffer
      : fs.readFileSync("./server/assets/defEvent.jpeg");

    const newEvent = new Event({
      user: user.username,
      title,
      location,
      date,
      description,
      datePosted,
      eventImage, // Use the uploaded image if available, otherwise use the default image
      likes,
    });

    await newEvent.save();

    res.status(201).send("Event created");
    console.log("Someone created an event:");
    console.log(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating event");
  }
});

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.username = username;
      req.session.profilePicture = user.profilePicture;
      return res.json({ message: "Login successful", username });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error logging in");
  }
}

app.post("/api/login", login);
app.post("/api/createUser", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const defaultProfilePicture = fs.readFileSync("./server/assets/capy.png");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      profilePicture: defaultProfilePicture,
    });

    await newUser.save();

    await login(req, res);

    console.log("New user created");
    console.log(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

app.get("/api/profile", async (req, res) => {
  const username = req.session.username;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: "User does not exist" });
  }

  const profilePicture = user.profilePicture.toString("base64");

  if (username) {
    res.json({ username, profilePicture });
  } else {
    res.status(401).json({ error: "User not logged in" });
  }
});

app.get("/api/getUserProfile", async (req, res) => {
  try {
    const { username: requestedUsername } = req.query;

    if (!requestedUsername) {
      return res.status(400).json({ error: "Username parameter is missing" });
    }

    const user = await User.findOne({ username: requestedUsername });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const profilePicture = user.profilePicture.toString("base64");

    res.json({ username: user.username, profilePicture });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Access the uploaded file from req.file.buffer
    const imageBuffer = req.file.buffer;

    // Get the username of the current user from the session
    const username = req.session.username;
    if (!username) {
      return res.status(401).json({ error: "User not logged in" });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's profile picture with the uploaded image buffer
    user.profilePicture = imageBuffer;

    // Save the updated user object to the database
    await user.save();

    res.status(200).json({ message: "Profile picture uploaded successfully" });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Add Friend
app.post("/api/addFriend", async (req, res) => {
  try {
    const { friendUsername } = req.body;

    const currentUserUsername = req.session.username;
    if (!currentUserUsername) {
      return res.status(401).json({ error: "User not logged in" });
    }

    const currentUser = await User.findOne({ username: currentUserUsername });
    if (!currentUser) {
      return res.status(404).json({ error: "Current user not found" });
    }

    // Check if the friend user exists
    const friendUser = await User.findOne({ username: friendUsername });
    if (!friendUser) {
      return res.status(404).json({ error: "Friend user not found" });
    }

    // Check if the friend is already in the user's friend list
    if (currentUser.friends.includes(friendUsername)) {
      return res
        .status(400)
        .json({ error: "Friend already exists in the friend list" });
    }

    // Add friend to the user's friend list
    currentUser.friends.push(friendUsername);
    await currentUser.save();

    res
      .status(200)
      .json({ message: "Friend added successfully", friend: friendUsername });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/removeFriend", async (req, res) => {
  try {
    const { friendUsername } = req.body;

    const currentUserUsername = req.session.username;
    if (!currentUserUsername) {
      return res.status(401).json({ error: "User not logged in" });
    }

    const currentUser = await User.findOne({ username: currentUserUsername });
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the friend user exists
    const friendUser = await User.findOne({ username: friendUsername });
    if (!friendUser) {
      return res.status(404).json({ error: "Friend user not found" });
    }

    // Check if the friend is in the user's friend list
    const friendIndex = currentUser.friends.indexOf(friendUsername);
    if (friendIndex === -1) {
      return res.status(400).json({ error: "Friend not found in friend list" });
    }

    // Remove friend from the user's friend list
    currentUser.friends.splice(friendIndex, 1);
    await currentUser.save();

    res
      .status(200)
      .json({ message: "Friend removed successfully", friend: friendUsername });
  } catch (error) {
    console.error("Error removing friend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/getFriends", async (req, res) => {
  try {
    const currentUserUsername = req.session.username;

    // Check if the current user is logged in
    if (!currentUserUsername) {
      return res.status(401).json({ error: "User not logged in" });
    }

    // Retrieve the current user from the database
    const currentUser = await User.findOne({ username: currentUserUsername });
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve friends of the current user
    const friends = await User.find({ username: { $in: currentUser.friends } });

    res.status(200).json({ friends });
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/eventImage/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Find the event by its ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Convert the eventImage buffer to base64 string
    const eventImageBase64 = event.eventImage.toString("base64");

    // Send the base64 string as the response
    res.json({ eventImageBase64 });
  } catch (error) {
    console.error("Error fetching event image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/attendEvent", async (req, res) => {
  try {
    const username = req.session.username;
    if (!username) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { eventId } = req.body;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.usersGoing.includes(username)) {
      return res.status(400).json({ error: "User already signed up" });
    }

    event.usersGoing.push(username);
    user.signedUpEvents.push(event);
    await event.save();
    await user.save();
  } catch (error) {
    console.error("Error pulling up to event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//API Endpoint
app.use(cors());
app.use(express.json());

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use(express.static(path.join(__dirname, "..", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
