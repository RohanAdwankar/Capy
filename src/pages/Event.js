import defEventPic from '../assets/defEvent.jpg';
import React, { useState, useEffect } from 'react';

export default function Event({eventData}){
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold">{eventData.title}</h1>
        <h2>{eventData.user}</h2>
        <p>{eventData.location}, {eventData.date}</p>
        <img src={eventData.image || defEventPic} alt="Event" className="w-full h-64 object-cover rounded" />
        <p>{eventData.description}</p>
    </div>
  );
}