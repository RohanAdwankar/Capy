import React from 'react';
import Lottie from 'react-lottie';
import animationData from './assets/capy.json'

function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div className="loading">
      <Lottie options={defaultOptions} speed={10.0} height={500} width={500} />
    </div>
  );
}

export default Loading;