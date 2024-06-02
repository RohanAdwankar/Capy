import React, { useState, useEffect } from 'react';
import capy from '../assets/pullupCrop.png';
import song from '../assets/songCrop.mp3';
export default function PullUpButton({eventData, userID}){
    <div className="relative">
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
  </div>
}
