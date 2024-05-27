import React, { useState } from 'react';
import defEventPic from '../assets/defEvent.jpg';
function Event() {
  const [eventname, seteventname] = useState("Default Event Name");
  const [hostName, setHostName] = useState("Default Host Name");
  const [eventLocation, setEventLocation] = useState("Default Event Location");
  const [eventDate, setEventDate] = useState("Default Event Date");
  const [eventDescription, setEventDescription] = useState("Default Event Description");
 
  //TODO: Add backend connection to populate state variables

  return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg px-12 py-8">
            <h1 className="text-3xl font-bold mb-4">{eventname}</h1>
            <h2 className="text-xl mb-2">{hostName}</h2>
            <h3 className="text-lg mb-4">{eventLocation},{eventDate}</h3>
            <img src={defEventPic} alt="Event" className="w-full h-64 object-cover mb-4 rounded"/>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4">Pull Up</button>
            <p className="text-gray-700">{eventDescription}</p>
        </div>
    </div>
  );
}

export default Event;