const express = require("express");
const router = express.Router();

const { User, Event } = require("./models"); // Import User and Event models

// //Add Friend
router.post("/addFriend", async (req, res) => {
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

        // Check if the friend is the same as the current user
        if (currentUser.username === friendUsername) {
        return res.status(401).json({ error: "Cannot add yourself as a friend" });
        }

        // Add friend to the user's friend list
        await currentUser.updateOne({ $push: { friends: friendUsername } });

        const newFriend = {
        username: friendUser.username,
        profilePicture: friendUser.profilePicture.toString("base64"),
        };

        res
        .status(200)
        .json({ message: "Friend added successfully", friend: newFriend });
    } catch (error) {
        console.error("Error adding friend:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/removeFriend", async (req, res) => {
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
        if (!currentUser.friends.includes(friendUsername)) {
        return res
            .status(404)
            .json({ error: "Friend does not exist in the friend list" });
        }

        await currentUser.updateOne({ $pull: { friends: friendUsername } });
        res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
        console.error("Error removing friend");
        res.status(500).json({ error: "Internal server error", error });
    }
});

router.get("/getFriends", async (req, res) => {
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
      const filtered = friends.map((friend) => {
        return {
          username: friend.username,
          profilePicture: friend.profilePicture.toString("base64"),
        };
      });
  
      res.status(200).json({ friends: filtered });
    } catch (error) {
      console.error("Error fetching friends:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
