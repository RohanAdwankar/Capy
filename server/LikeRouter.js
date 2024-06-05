const express = require("express");
const router = express.Router();

const { User, Event } = require("./models");

router.post("/likeEvent", async (req, res) => {
  try {
    console.log("LIKING EVENT BOZO JOHNNY");
    const { eventID } = req.body;
    const event = await Event.findById(eventID);
    const username = req.session.username;
    if (!username) {
      return res.status(401).json({ error: "User not logged in" });
    }
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    // Start updating server
    await event.updateOne({ $push: { usersLiked: username } });
    console.log("list of users who liked this event:", event.usersLiked);
    res.status(200).json({ message: "You liked this event!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Sorry Error liking this event");
  }
});

router.post("/likeEventUndo", async (req, res) => {
  try {
    const { eventID } = req.body;
    const username = req.session.username;
    const event = await Event.findById(eventID);
    if (!username) {
      return res.status(401).json({ error: "User not logged in" });
    }
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    // Start updating server
    await event.updateOne({ $pull: { usersLiked: username } });
    console.log("list of users who liked this event:", event.usersLiked);
    res.status(200).json({ message: "You unliked this event!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Sorry Error unliking this event");
  }
});

router.post("/attendEvent", async (req, res) => {
  try {
    const { eventID } = req.body;
    const event = await Event.findById(eventID);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const username = req.session.username;
    if (!username) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      console.log("THIS IS THIS ISSUE BOZO1:", username);
      return res.status(404).json({ error: "User not found" });
    }

    if (event.usersGoing.includes(username)) {
      return res.status(400).json({ error: "User already signed up" });
    }

    console.log("attemping to add user from usersGoing list in event");
    await event.updateOne({ $push: { usersGoing: username } });
    console.log("finished adding user from usersGoing list in event");
    // for some reason, event.usersGoing is not updated
    console.log("users which are pull up to this event:", event.usersGoing);

    console.log("attempting to add event from user");
    await user.updateOne({ $push: { signedUpEvents: event._id } });
    console.log("finished adding event from user");
    // for some reason, user.signedUpEvents is not updated.
    console.log("events this user is attending:", user.signedUpEvents);
    res.status(200).json({ message: "You attended this event!" });
  } catch (error) {
    console.error("Error pulling up to event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/attendEventUndo", async (req, res) => {
  try {
    const { eventID } = req.body;
    const event = await Event.findById(eventID);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const username = req.session.username;
    if (!username) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      console.log("THIS IS THIS ISSUE BOZO:", username);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("attemping to remove user from usersGoing list in event");
    await event.updateOne({ $pull: { usersGoing: username } });
    console.log("finished removing user from usersGoing list in event");
    console.log(
      "users which are pull up to this event (undo version):",
      event.usersGoing
    );

    console.log("attempting to remove event from user");
    await user.updateOne({ $pull: { signedUpEvents: event._id } });
    console.log("finished removing event from user");
    // for some reason, user.signedUpEvents is not updated.
    console.log(
      "events this user is attending (undo version):",
      user.signedUpEvents
    );
    res.status(200).json({ message: "You unattended this event!" });
  } catch (error) {
    console.error("Error pulling up to event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
    console.log("REACHING THIS BOZO GET FREINDS BODY JOHNNY");
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

router.post("/goofy", async (req, res) => {
  try {
    console.log("GOOFY GOOFY GOOFY");
    res.status(200).json({ message: "You goofy!" });
  } catch (error) {
    console.error("Error goofy:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
