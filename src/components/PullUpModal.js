import React, { useEffect, useRef } from "react";
import pullupgif from "../assets/okhpu.gif";
import song from '../assets/song.mp3';

const Modal = ({ eventData, showModal, onClose }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (!audioRef.current) return;
        if (showModal) {
        audioRef.current.play();
        } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        }
    }, [showModal]);

    function formatRFC5545(startDate) {
        const pad = (num) => String(num).padStart(2, '0');

        const formatDate = (date) => {
            const year = date.getUTCFullYear();
            const month = pad(date.getUTCMonth() + 1); // getUTCMonth() returns month from 0-11
            const day = pad(date.getUTCDate());
            const hours = pad(date.getUTCHours());
            const minutes = pad(date.getUTCMinutes());
            const seconds = pad(date.getUTCSeconds());
            
            return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
        };

        const endDate = new Date(startDate);
        endDate.setUTCHours(endDate.getUTCHours() + 1);

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        return `${formattedStartDate}/${formattedEndDate}`;
    }

  function saveToGCal() {
    const date = formatRFC5545(new Date(eventData.date));
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventData.title}&dates=${date}&details=${eventData.description}&location=${eventData.location}`;
    window.open(gCalUrl, '_blank');
  }

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-8 shadow-lg relative flex flex-col items-center">
            <h1 className="text-xl font-bold mb-3">{eventData.title} @ {eventData.location}</h1>
            <p>{eventData.date}</p>
            <img src={pullupgif} alt="capybara in car gif" className="mb-4"/>
            <button onClick={saveToGCal} className="px-4 py-2 text-white bg-gray-500 rounded my-3 w-full">Save to Google Calendar</button> 
            <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded w-full">Close</button>
            <audio ref={audioRef} src={song} />
        </div>
    </div>
  );
};

export default Modal;