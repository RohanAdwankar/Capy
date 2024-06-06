require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const crypto = require("crypto");
const bcrypt = require("bcrypt");

const secretKey = crypto.randomBytes(32).toString("hex");
console.log("Generated Secret Key:", secretKey);

const { User, Event } = require("./models"); // Import User and Event models

const router = express.Router();

//add comment route
router.post('/addComment', async (req, res) => {
    try{
        const { eventID, comment } = req.body;
        const username = req.session.username;

        if(!username){
            return res.status(401).json({ error: "User not logged in"});
        }

        //find event by ID
        const event = await Event.findById(eventID);

        if(!event || !comment){
            return res.status(400).json({error: "Event not Found"});
        }

        //add comment
        event.comments.push(comment);

        //add user to comment list
        const user = await User.findOne({username: username});
        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        if(!event.usersCommented.includes(user.username)){
            event.usersCommented.push(user.username);
        }
        await event.save();

        res.status(201).send({message: 'Comment added successfully', event: event});
    } catch(error){
        console.error('Failed to add a comment:', error);
        res.status(500).send({message: 'Failed to add a comment'});
    }
});

//get comment route
router.get('/getComments', async (req, res) => {
    try {
        const username = req.session.username;
        const { eventID } = req.body;

        if(!username){
            return res.status(401).json({error: "User not logged in"});
        }

        const event = await Event.findById(eventID);

        if(!event){
            return res.status(404).json({error: "Event not found"});
        }

        if(event.comments.length <= 0){
            return res.status(404).json({error: "No comments to get"});
        }

      //  const comments = await Event.find({});

        //const user = await Use;
    }catch(error){

    }
})

//remove comment route


//like comment??? -- maybe

module.exports = router;