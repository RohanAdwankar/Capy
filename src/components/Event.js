import defEventPic from '../assets/defEvent.jpg';
import React, { useState, useEffect } from 'react';
import capy from '../assets/capy.png';
import song from '../assets/songCrop.mp3';
//import faCalendarDays from FontAwesomeIcon; 

export default function Event({eventData}){
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleCommentClick = () =>{
    setShowComments(!showComments);
  };

  const handleLikeClick = () => {
    setLikes(likes+1);
  };

  let audio = new Audio(song)

  const start = () => {
    audio.play()
    console.log("playing")
  }
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
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
          {/* <img
            src={capy}
            alt="Animation"
            className={`object-scale-down h-10 w-10 absolute transform transition-transform duration-500 ease-in-out ${showAnimation ? 'translate-x-full' : ''}`}
          /> */}
          <h1 className="text-2xl font-bold">{eventData.title}</h1>
          <h2>{eventData.user}</h2>
          <p>{eventData.location}, {eventData.date}</p>
        </div>
        <img src={eventData.image || defEventPic} alt="Event" className="w-full h-64 object-cover rounded" />
        <p>{eventData.description}</p>
        <div className='mt-4'>
          <button
          onClick={handleLikeClick} 
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
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