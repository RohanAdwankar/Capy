import defEventPic from "../assets/defEvent.jpeg";
import React, { useState, useEffect } from "react";
import capy from "../assets/pullupCrop.png";
import song from "../assets/songCrop.mp3";
import { store } from "../Main.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Event({ eventData }) {
  const [isSignedIn, setSignedIn] = store.useState("signedIn", {
    default: false,
  });
  const [signedInUsername, setSignedInUsername] = store.useState(
    "signedInUsername",
    { default: "" }
  );
  const [likes, setLikes] = useState(eventData.usersLiked.length);
  const [numberAttending, setNumberAttending] = useState(
    eventData.usersGoing.length
  );

  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showAnimation, setShowAnimation] = useState(false);
  const [showPopUpAnimation, setShowPopUpAnimation] = useState(false);

  const [userLiked, setUserLiked] = useState(
    eventData.usersLiked.includes(signedInUsername) && isSignedIn
  );

  const [userIsPullingUp, setUserIsPullingUp] = useState(
    eventData.usersGoing.includes(signedInUsername) && isSignedIn
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventImageBase64, setEventImageBase64] = useState(null);

  const [usersGoing, setUsersGoing] = useState([]);

  const [goingLoading, setGoingLoading] = useState(true);

  useEffect(() => {
    const fetchUsersGoing = async () => {
      try {
        const response = await axios.get(
          `/api/events/${eventData._id}/usersGoing`
        );
        setUsersGoing(response.data);
        setGoingLoading(false);
      } catch (error) {
        console.error("Error fetching users going:", error);
      }
    };

    if (isModalOpen) {
      fetchUsersGoing();
    }
  }, [isModalOpen, eventData._id]);

  useEffect(() => {
    // Fetch the event image as base64 string
    async function fetchEventImage() {
      try {
        const response = await axios.get(`/api/eventImage/${eventData._id}`);
        setEventImageBase64(response.data.eventImageBase64);
      } catch (error) {
        console.error("Error Fetching Event Image:", error);
      }
    }

    fetchEventImage();
  }, [eventData._id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("/api/events/comments/getComments", {
          params: { eventID: eventData._id },
        });
        setComments(response.data.comments);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };

    fetchComments();
  }, [eventData._id]);

  const handleCommentClick = async (event) => {
    event.preventDefault();

    const commentInput = event.target.elements.comment;
    const comment = commentInput.value.trim();

    if (!comment) {
      alert("Comment Field cannot be empty");
      return;
    }

    if (!isSignedIn) {
      alert("Must be signed in to comment");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/events/comments/addComment", {
        eventID: eventData._id,
        comment,
      });

      if (response.status == 200) {
        console.log("Comment submitted successfully");
        const newComment = response.data.newComment;
        setComments((prevComments) => [...prevComments, newComment]);
        commentInput.value = "";
      }
    } catch (error) {
      console.error("Failed to add comment from form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentID) => {
    try {
      const response = await axios.delete(
        "/api/events/comments/deleteComment",
        {
          data: {
            eventID: eventData._id,
            commentID,
          },
        }
      );

      if (response.status === 200) {
        console.log("Comment deleted successfully");
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentID)
        );
      }
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  const handleLikeClick = async () => {
    console.log("REACHED THIS BOZO");
    if (!isSignedIn) {
      alert("Must be signed in to like event.");
      return;
    }
    if (!userLiked) {
      console.log("liked on frontend");
      setLikes(likes + 1);
      setUserLiked(true);
      try {
        await axios.post("/api/events/likes/likeEvent", {
          eventID: eventData._id,
        });
        console.log("Liked successfully on backend");
        // The eventData variable is passed into Event and is constant
        console.log("Current Event Data:", eventData);
      } catch (error) {
        console.error("Error liking on backend:", error);
      }
    } else {
      console.log("unliked on frontend");
      setLikes(likes - 1);
      setUserLiked(false);
      try {
        await axios.post("/api/events/likes/likeEventUndo", {
          eventID: eventData._id,
        });
        console.log("Liked Undo successfully on backend");
        // The eventData variable is passed into Event and is constant
        console.log("Current Event Data:", eventData);
      } catch (error) {
        console.error("Error Undo liking on backend:", error);
      }
    }
  };

  const handlePullUpClick = async () => {
    if (!isSignedIn) {
      alert("Must be signed in to pull up to event.");
      return;
    } else {
      if (!userIsPullingUp) {
        console.log("attended on frontend");
        start();
        setUserIsPullingUp(true);
        setNumberAttending(numberAttending + 1);
        setShowPopUpAnimation(true);
        try {
          console.log("attempting to record attendance on backend");
          await axios.post("/api/events/likes/attendEvent", {
            eventID: eventData._id,
          });
          console.log("Attendance recorded successfully on backend");
          // The eventData variable is passed into Event and is constant
          console.log("Current Event Data:", eventData);
        } catch (error) {
          console.error("Error recording attendance:", error);
        }
      } else {
        console.log("unattended on frontend");
        setUserIsPullingUp(false);
        setNumberAttending(numberAttending - 1);
        setShowPopUpAnimation(false);
        try {
          console.log("attempting to record undo attendance on backend");
          await axios.post("/api/events/likes/attendEventUndo", {
            eventID: eventData._id,
          });
          console.log("Attendance undo recorded successfully on backend");
          // The eventData variable is passed into Event and is constant
          console.log("Current Event Data:", eventData);
        } catch (error) {
          console.error("Error recording attendance undo:", error);
        }
      }
    }
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  let audio = new Audio(song);

  const start = () => {
    audio.play();
    console.log("playing");
  };

  const EventDateDisplay = ({ eventData }) => {
    if (!eventData.date) {
      return (
        <p>
          {" "}
          <FontAwesomeIcon icon={faCalendarDays} /> Error: Could not display
          date{" "}
        </p>
      );
    }

    const TimeString = new Date(eventData.date).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const DateString = new Date(eventData.date).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <p>
        <FontAwesomeIcon icon={faCalendarDays} />{" "}
        {TimeString + " on " + DateString}
      </p>
    );
  };

  const EventLocationClick = ({ eventData }) => {
    if (!eventData.location) {
      return (
        <p>
          {" "}
          <FontAwesomeIcon icon={faLocationDot} /> Error: Could not display
          location{" "}
        </p>
      );
    }

    const MapsURL = "https://www.google.com/maps/search/?api=1&query=";
    const LocationString = eventData.location.replace(/ /g, "+");

    const fullURL = MapsURL + LocationString;

    return (
      <p>
        <FontAwesomeIcon icon={faLocationDot} />{" "}
        <a href={fullURL} target="_blank" rel="noopener noreferrer">
          {" "}
          {eventData.location}{" "}
        </a>
      </p>
    );
  };

  const HeartButton = ({ onClick, isLiked }) => {
    return (
      <button
        onClick={onClick}
        className={`p-2 rounded-full focus:outline-none transition duration-200`}
      >
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill={isLiked ? "red" : "white"}
          stroke="black"
          strokeWidth="2"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    );
  };

  //Display --------------------------------
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {/* Pop Up for Bigger View */}
      {isModalOpen ? (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleModalClick}
        >
          <div
            className="bg-white p-5 rounded shadow-lg w-3/4 h-3/4 overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-8 right-8">
              <button
                onClick={() => {
                  handlePullUpClick();
                }}
                className={`px-4 py-2 rounded-lg
          ${
            userIsPullingUp
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
              >
                Pull Up ({numberAttending})
              </button>
            </div>
            <h1 className="text-4xl mb-4">
              <strong>{eventData.title}</strong>
            </h1>
            <div className="relative flex items-center mb-4">
              <p>
                {" "}
                <EventLocationClick eventData={eventData} />
              </p>
              <p>&nbsp;&nbsp;</p>
              <p>
                {" "}
                <EventDateDisplay eventData={eventData} />
              </p>
            </div>

            <div className="flex flex-row">
              {" "}
              {/* flex container*/}
              <div className="w-1/2 mr-4">
                <div className="saturate-50 flex justify-between items-center">
                  {/* Use the fetched event image base64 string */}
                  <img
                    src={
                      eventImageBase64
                        ? `data:image/jpeg;base64,${eventImageBase64}`
                        : defEventPic
                    }
                    alt="Event"
                    className="w-full h-64 object-cover rounded"
                  />
                </div>
                <p className="mt-4">{eventData.description}</p>
              </div>
              <div className="w-1/2">
                <div>
                  <h3 className="text-lg font-bold">Users Going:</h3>
                  {goingLoading ? (
                    <p>Loading...</p>
                  ) : usersGoing.length > 0 ? (
                    <div className="flex flex-wrap space-y-2 space-x-2 mb-5">
                      {usersGoing.map((user) => (
                        <div
                          key={user._id}
                          className="bg-gray-200 rounded-full px-3 py-1"
                        >
                          {user.username}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No users are going to this event.</p>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold">Comments:</h3>
                  {comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <div
                        key={index}
                        className="bg-gray-200 p-2 mt-1 mb-1 rounded-lg flex items-center"
                      >
                        <div className="mr-4 flex-shrink-0">
                          <img
                            src={
                              comment.user && comment.user.profilePicture
                                ? `data:image/jpeg;base64,${Buffer.from(
                                    comment.user.profilePicture
                                  ).toString("base64")}`
                                : "path_to_default_avatar_image"
                            }
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                        <div className="flex flex-col flex-grow">
                          <strong>
                            {comment.user
                              ? comment.user.username
                              : "Unknown User"}
                          </strong>
                          <p className="mt-1">{comment.text}</p>
                        </div>
                        {comment.user &&
                          comment.user.username === signedInUsername && (
                            <button
                              className="ml-2 bg-red-500 text-white px-2 py-1 rounded-lg"
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              Delete
                            </button>
                          )}
                      </div>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </div>
                <form onSubmit={handleCommentClick}>
                  <textarea
                    name="comment"
                    className="w-full border rounded p-2 mb-2"
                    placeholder="Type your comment here..."
                    disabled={isSubmitting}
                  ></textarea>
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Add Comment"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/*Normal Event Component*/}

      <div className="relative">
        {/* Add the "Pull Up" button */}
        <img
          src={capy}
          alt="Animation"
          className={`object-scale-down h-5 w-5 absolute opacity-0 ${
            showPopUpAnimation ? "animate-fadeInScaleRotate" : ""
          }`}
        />
        <h1 className="text-2xl font-bold">{eventData.title}</h1>
        <h2>{eventData.user}</h2>
        <p>
          {" "}
          <EventLocationClick eventData={eventData} />
        </p>
        <p>
          {" "}
          <EventDateDisplay eventData={eventData} />
        </p>
      </div>
      <div className="saturate-50 flex justify-between items-center mt-4">
        {/* Use the fetched event image base64 string */}
        <img
          src={
            eventImageBase64
              ? `data:image/jpeg;base64,${eventImageBase64}`
              : defEventPic
          }
          alt="Event"
          className="w-full h-64 object-cover rounded"
        />
      </div>
      <p>
        {/* Shortened Description */}
        {eventData.description.length > 33
          ? eventData.description.split("").slice(0, 33).join("") + "..."
          : eventData.description}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <HeartButton
            isLiked={userLiked}
            onClick={() => {
              handleLikeClick();
            }}
          />
          <p className="text-center">{likes}</p>
        </div>
        <button
          onClick={() => {
            // setShowAnimation(!showAnimation);
            // start();
            handlePullUpClick();
          }}
          className={`px-4 py-2 rounded-lg
          ${
            userIsPullingUp
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Pull Up ({numberAttending})
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          More Details
        </button>
      </div>
    </div>
  );
}
