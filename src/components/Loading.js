import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/loading.gif'

function Loading() {

  return (
    <div className="loading">
      <img src={animationData} />
    </div>
  );
}

export default Loading;