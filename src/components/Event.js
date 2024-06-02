import defEventPic from '../assets/defEvent.jpeg';
import React, { useState, useEffect } from 'react';
import capy from '../assets/pullupCrop.png';
import song from '../assets/songCrop.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
// import PullUpButton from './PullUpButton';

export default function Event({eventData, userID}){
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showPopUpAnimation, setShowPopUpAnimation] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleCommentClick = () =>{
    setShowComments(!showComments);
  };

  const handleLikeClick = () => {
    if(!userLiked) {
    setLikes(likes+1);
    setUserLiked(true);
    }
  };

  const handlePullUpClick = async () => {
    try {
      await axios.post('/api/attendEvent', { eventID: eventData._id});
      console.log('Attendance recorded successfully');
    } catch (error) {
      console.error('Error recording attendance:', error);
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
          <div className="bg-white p-5 rounded shadow-lg w-3/4 h-3/4 overflow-auto relative">
            <div className="absolute top-2 right-2">
              <button onClick={() => setIsModalOpen(false)} className=" bg-red-500 text-white px-4 py-2 rounded-r">Close</button>
            </div>
            <button
                onClick={() => {
                  setShowPopUpAnimation(!showPopUpAnimation);
                  start();
                  handlePullUpClick();
                }}
                className="absolute top-2 right-20 bg-blue-500 text-white px-4 py-2 rounded-l"
              >
                Pull Up
            </button>
            <h1 className="text-4xl mb-4">{eventData.title}</h1>
            <div className="relative flex items-center mb-4">
              <p> <FontAwesomeIcon icon={faLocationDot}/> {eventData.location}</p>
              <p>&nbsp;&nbsp;</p>
              <p>  <FontAwesomeIcon icon={faCalendarDays} /> {eventData.date} </p>
              {/* <img src={user.profilePicture} alt="User" className="w-10 h-10 rounded-full mr-4" />
              <h2 className="text-xl">{user.name}</h2> */}

            </div>
            {/* <img src={eventData.picture} alt="Event" className="mb-4" /> */}

          <img
            src={capy}
            alt="Animation"
            className={` h-5 w-5 absolute opacity-0 ${showPopUpAnimation ? 'animate-fadeInScaleRotate' : ''}`}
          />
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Pull Up</button> */}
            <p className="mb-4">{eventData.description}</p>
            {/* <div>
              {comments.map(comment => (
                <div key={comment.id} className="mb-4">
                  <h3 className="text-lg mb-2">{comment.user}</h3>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      ) : null}

        <div className="relative">
          {/* <PullUpButton/> */}
        {/* Add the "Pull Up" button */}
          {/* <button className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded">
            Pull Up
          </button> */}
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
          <p>  
            <FontAwesomeIcon icon={faCalendarDays} /> {' '}
            {new Date(eventData.date).toLocaleString('en-US', {
              hour: 'numeric', 
              minute:'numeric', 
              hour12: true}) + " on " + new Date(eventData.date).toLocaleString('en-US', {
                weekday: 'long', 
                year:'numeric', 
                month:'long', 
                day:'numeric'})}
          </p>
        </div>
        <div className="saturate-50 flex justify-between items-center mt-4">
          <img src={eventData.image || defEventPic} alt="Event" className="w-full h-64 object-cover rounded" />
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
          {/* <button
          onClick={handleCommentClick}
          className= "bg-gray-500 text-white px-4 py-2 rounded"
          >
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button> */}
          {/* <button className= "bg-gray-500 text-white px-4 py-2 rounded">
            {"Show Details"}
          </button> */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className= "bg-gray-500 text-white px-4 py-2 rounded"
            >More Details</button>
        </div>
    </div>
  );
}