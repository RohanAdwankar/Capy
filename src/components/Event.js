import defEventPic from '../assets/defEvent.jpg';
import React, { useState, useEffect } from 'react';
//import faCalendarDays from FontAwesomeIcon; 

export default function Event({eventData, userID}){
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [userLiked, setUserLiked] = useState(false);


  const handleCommentClick = () =>{
    setShowComments(!showComments);
  };

  const handleLikeClick = () => {
    if(!userLiked) {
    setLikes(likes+1);
    setUserLiked(true);
    }
  };
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
        <div className="relative">
        {/* Add the "Pull Up" button */}
          <button className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded">
            Pull Up
          </button>
          <h1 className="text-2xl font-bold">{eventData.title}</h1>
          <h2>{eventData.user}</h2>
          <p>{eventData.location}, {eventData.date}</p>
        </div>
        <img src={eventData.image || defEventPic} alt="Event" className="w-full h-64 object-cover rounded" />
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
          onClick={handleCommentClick}
          className= "bg-gray-500 text-white px-4 py-2 rounded"
          >
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
        </div>
    </div>
  );
}