const express = require("express");
const router = express.Router();

const { User, Event } = require("./models"); // Import User and Event models

//add comment route
router.post('/addComment', async (req, res) => {
    try{
        console.log("Received request to create comment");
        const { eventID, comment } = req.body;
        const username = req.session.username;

        if(!username){
            return res.status(401).json({ error: "User not logged in"});
        }

        if(!comment){
            return res.status(401).json({error: "Comment field cannot be empty"});
        }

        const user = await User.findOne({username});
        
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }

        const event = await Event.findById(eventID);
        
        if(!event) {
            return res.status(404).json({error: "Event not found"});
        }

        const userComment = {user: user._id, text: comment};

        event.comments.push(userComment);

        await event.save();

        const updatedEvent = await Event.findById(eventID).populate('comments.user', 'username');
        const newComment = updatedEvent.comments[updatedEvent.comments.length-1];



        res.status(200).json({message: "Comment Successfully Added!", newComment});
    } catch (error) {
        console.error(error);
        res.status(500).send("Comment Failed to Add");
    }
});

//get comment route
router.get('/getComments', async (req, res) => {
    try {
        const { eventID } = req.query;

        if(!eventID){
            return res.status(400).json({error: "Event ID required"});
        }

        const event = await Event.findById(eventID).populate({
            path: 'comments.user', 
            select: 'username profilePicture'
        });

        if(!event){
            return res.status(404).json({error: "Event not found"});
        }

        console.log("Event Comments Fetched:", event.comments);

        res.status(200).json({comments: event.comments});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});

//remove comment route

router.delete('/deleteComment', async(req, res) => {
    try {
        const {eventID, commentID} = req.body;
        const username = req.session.username;

        if(!username) {
            return res.status(401).json({error: 'User not logged in'});
        }

        const user = await User.findOne({username});
        const event = await Event.findById(eventID);

        if(!event){
            return res.status(404).json({error: 'Event not Found'});
        }

        const comment = event.comments.id(commentID);

        if(!comment){
            return res.status(404).json({error: 'Comment not Found'});
        }

        if(!comment.user.equals(user._id)) {
            return res.status(403).json({error: 'Not authorized to delete this comment'});
        }

        event.comments.pull(commentID);
        await event.save();

        res.status(200).json({message: 'Comment deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to delete comment'});
    }
});


//like comment??? -- maybe

module.exports = router;