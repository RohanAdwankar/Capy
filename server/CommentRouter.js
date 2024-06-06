const express = require("express");
const router = express.Router();

const { User, Event } = require("./models"); // Import User and Event models

//add comment route
router.post('/addComment', async (req, res) => {
    try{
        const { eventID, comment } = req.body;
        const username = req.session.username;

        if(!username){
            return res.status(401).json({ error: "User not logged in"});
        }

        if(!comment){
            return res.status(401).json({error: "Comment field cannot be empty"});
        }

        const user = await User.findOne({username});
        const event = await Event.findById(eventID);

        await Event.findByIdAndUpdate(eventID, {
            $push: {comments: comment},
            $addToSet: {usersCommented: user._id} //addtoset only adds if its not present
        });

        res.status(200).json({message: "Comment Successfully Added!"});
    } catch (error) {
        console.error(error);
        res.status(500).send("Comment Failed to Add");
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

        if(event.comments.length === 0){
            return res.status(404).json({error: "No comments to get"});
        }

        res.status(200).json({comments: event.comments});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});

//remove comment route


//like comment??? -- maybe

module.exports = router;