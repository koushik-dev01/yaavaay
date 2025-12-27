import React, { useEffect, useRef } from "react";
import backvideo from "../images/backvideo.mp4";

const CubeVideoComponent = ({ stopTime }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= stopTime) {
        videoElement.pause();
      }
    };

    // Play the video again if stopTime changes
    videoElement.play();

    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [stopTime]);

  return (
    <div className="video-overlay">
      <video autoPlay muted loop className="background-video" ref={videoRef}>
        <source src={backvideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default CubeVideoComponent;
