import defEventPic from '../assets/defEvent.jpeg';
import React, { useState, useEffect } from 'react';
import capy from '../assets/pullupCrop.png';
import song from '../assets/songCrop.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

export default function Event({eventData, userID}) {
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventImageBase64, setEventImageBase64] = useState(null);

  useEffect(() => {
    // Fetch the event image as base64 string
    async function fetchEventImage() {
      try {
        const response = await axios.get(`/api/eventImage/${eventData._id}`);
        setEventImageBase64(response.data.eventImageBase64);
      } catch (error) {
        console.error('Error fetching event image:', error);
      }
    }

    fetchEventImage();
  }, [eventData._id]);

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  const handleLikeClick = () => {
    if (!userLiked) {
      setLikes(likes + 1);
      setUserLiked(true);
    }
  };

  let audio = new Audio(song)

  const start = () => {
    audio.play()
    console.log("playing")
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {/* Pop Up for Bigger View */}
      {isModalOpen ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded shadow-lg w-3/4 h-3/4 overflow-auto">
            {/* Detailed view of the event goes here */}
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      ) : null}

      <div className="relative">
        {/* Add the "Pull Up" button */}
        <button className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded">
          Pull Up
        </button>
        <button
          onClick={() => {
            setShowAnimation(!showAnimation);
            start();
          }}
          className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Pull Up
        </button>
        <img
          src={capy}
          alt="Animation"
          className={`object-scale-down h-5 w-5 absolute opacity-0 ${showAnimation ? 'animate-fadeInScaleRotate' : ''}`}
        />
        <h1 className="text-2xl font-bold">{eventData.title}</h1>
        <h2>{eventData.user}</h2>
        <p> <FontAwesomeIcon icon={faLocationDot}/> {eventData.location}</p>
        <p>  <FontAwesomeIcon icon={faCalendarDays} /> {eventData.date} </p>
      </div>
      <div className="saturate-50 flex justify-between items-center mt-4">
        {/* Use the fetched event image base64 string */}
        <img
            src={eventImageBase64 ? `data:image/jpeg;base64,${eventImageBase64}`: defEventPic}
            alt="Event"
            className="w-full h-64 object-cover rounded"
          />

      </div>
      <p>{eventData.description}</p>
      <div className='mt-4'>
        <button
          onClick={handleLikeClick}
          className={`px-4 py-2 rounded mr-2 ${
            userLiked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          disabled={userLiked}
        >
          like({likes})
        </button>
        <button 
          onClick={() => setIsModalOpen(true)}
          className= "bg-gray-500 text-white px-4 py-2 rounded"
        >
          More Details
        </button>
      </div>
    </div>
  );
}
