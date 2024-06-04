require("dotenv").config();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    profilePicture: Buffer,
    friends: [{ type: String }],
    myEvents: [{ type: String }],
    signedUpEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
    createdEvents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
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
  usersCommented: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  comments: [{type: String}]
});

module.exports = {
    User: mongoose.model("User", userSchema),
    Event: mongoose.model("Event", eventSchema),
}

