import defEventPic from "../assets/defEvent.jpeg";
import React, { useState, useEffect } from "react";
import capy from "../assets/pullupCrop.png";
import song from "../assets/songCrop.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

require("./globalVariables");
console.log(global.myGlobalVar); // Outputs: Hello, world!

export default function Event({ eventData }) {
  const [likes, setLikes] = useState(eventData.usersLiked.length);
  const [numberAttending, setNumberAttending] = useState(
    eventData.usersGoing.length
  );
  const [showComments, setShowComments] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showPopUpAnimation, setShowPopUpAnimation] = useState(false);
  const [userLiked, setUserLiked] = useState(
    eventData.usersLiked.includes(global.currentUsername) &&
      global.currentUsername !== ""
  );
  const [userIsPullingUp, setUserIsPullingUp] = useState(
    eventData.usersGoing.includes(global.currentUsername) &&
      global.currentUsername !== ""
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventImageBase64, setEventImageBase64] = useState(null);
  // console.log("TESTING EVENTJS");
  // console.log(global.currentUsername);
  // console.log(eventData);
  // console.log(eventData.usersLiked.includes(global.currentUsername));
  // console.log(global.currentUsername !== "");

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

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  const handleLikeClick = async () => {
    console.log("REACHED THIS BOZO");
    if (global.currentUsername === "") {
      alert("Must be signed in to like event.");
      return;
    }
    if (!userLiked) {
      // console.log("LIKED");
      setLikes(likes + 1);
      setUserLiked(true);
      try {
        await axios.post("/api/likeEvent", { eventID: eventData._id });
        console.log("Liked successfully");
        console.log("Current Event Data:", eventData);
      } catch (error) {
        console.error("Error liking:", error);
      }
    } else {
      // console.log("UNLIKED");
      setLikes(likes - 1);
      setUserLiked(false);
      try {
        await axios.post("/api/likeEventUndo", { eventID: eventData._id });
        console.log("Liked Undo successfully");
        console.log("Current Event Data:", eventData);
      } catch (error) {
        console.error("Error Undo liking:", error);
      }
    }
  };

  const handlePullUpClick = async () => {
    if (global.currentUsername === "") {
      alert("Must be signed in to pull up to event.");
      return;
    } else {
      if (!userIsPullingUp) {
        setUserIsPullingUp(true);
        setNumberAttending(numberAttending + 1);
        setShowPopUpAnimation(true);
        start();
        try {
          await axios.post("/api/attendEvent", { eventId: eventData._id });
          console.log("Attendance recorded successfully");
          console.log("Current Event Data:", eventData);
        } catch (error) {
          console.error("Error recording attendance:", error);
        }
      } else {
        setUserIsPullingUp(false);
        setNumberAttending(numberAttending - 1);
        setShowPopUpAnimation(false);
        try {
          await axios.post("/api/attendEventUndo", { eventId: eventData._id });
          console.log("Attendance undo recorded successfully");
          console.log("Current Event Data:", eventData);
        } catch (error) {
          console.error("Error recording attendance undo:", error);
        }
      }
    }
  };


  let audio = new Audio(song);

  const start = () => {
    audio.play();
    console.log("playing");
  };

  const EventDateDisplay = ({ eventData }) => {
    if(!eventData.date){
      return <p> <FontAwesomeIcon icon={faCalendarDays} /> {' '} Error: Could not display date </p>;
    }

    const TimeString = new Date(eventData.date).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    const DateString = new Date(eventData.date).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <p>
        <FontAwesomeIcon icon={faCalendarDays} /> {' '}
        {TimeString + " on " + DateString}
      </p>
    );
  };

  const EventLocationClick = ({eventData}) => {
    if(!eventData.location){
      return <p> <FontAwesomeIcon icon={faLocationDot}/> {' '} Error: Could not display location </p>
    }

    const MapsURL = "https://www.google.com/maps/search/?api=1&query=";
    const LocationString = eventData.location.replace(/ /g, '+');

    const fullURL = MapsURL + LocationString;

    return(
      <p>
        <FontAwesomeIcon icon={faLocationDot}/> {' '}
        <a href={fullURL} target="_blank" rel="noopener noreferrer"> {eventData.location} </a>
      </p>
    )

  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {/* Pop Up for Bigger View */}
      {isModalOpen ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded shadow-lg w-3/4 h-3/4 overflow-auto relative">
            <div className="absolute top-2 right-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className=" bg-red-500 text-white px-4 py-2 rounded-r"
              >
                Close
              </button>
            </div>
            <button
              onClick={() => {

                handlePullUpClick();
              }}
              className={`absolute top-2 right-20 px-4 py-2 rounded-l
              ${
                userIsPullingUp
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Pull Up ({numberAttending})
            </button>

            <h1 className="text-4xl mb-4">{eventData.title}</h1>
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




            <img
              src={capy}
              alt="Animation"
              className={` h-5 w-5 absolute opacity-0 ${
                showPopUpAnimation ? "animate-fadeInScaleRotate" : ""
              }`}
            />
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Pull Up</button> */}
            <p className="mb-4">{eventData.description}</p>
          </div>
        </div>
      ) : null}

      {/*Normal Event Component*/}

      <div className="relative">
        {/* Add the "Pull Up" button */}
        <button className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded">
          Pull Up ({numberAttending})
        </button>
        <button
          onClick={() => {
            // setShowAnimation(!showAnimation);
            // start();
            handlePullUpClick();
          }}
          className={`absolute top-0 right-0 px-4 py-2 rounded
          ${
            userIsPullingUp
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Pull Up ({numberAttending})
        </button>
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

      <div className="mt-4">
        <button
          onClick={() => {
            handleLikeClick();
          }}
          className={`px-4 py-2 rounded mr-2 ${
            userLiked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          // disabled={currentUser === ""}
        >
          like ({likes})
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          More Details
        </button>
      </div>
    </div>
  );
}
