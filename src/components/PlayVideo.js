import React, { useState, useEffect, useRef } from "react";

export default function PlayVideo() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); 
  const [mediaPlaying, setMediaPlaying] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      const audio = audioRef.current;

      if (video && audio) {
        const videoRect = video.getBoundingClientRect();

        // Check if video is completely out of the viewport
        if (videoRect.top >= 0 && videoRect.bottom <= window.innerHeight) {
          if (!mediaPlaying) {
            video.play();
            audio.pause();
            setMediaPlaying(true);
            setIsPlaying(true);
          }
        } else {
          if (mediaPlaying) {
            video.pause();
            audio.play();
            setMediaPlaying(false);
            setIsPlaying(false);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mediaPlaying]);

  const handlePlay = () => {
    videoRef.current.play();
    audioRef.current.pause();
    setIsPlaying(true);
  };

  /* TODO: Add Captions if available
  		<track
          src="/captions.vtt"
          kind="captions"
          srcLang="en"
          label="English"
          default
        />
  */

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="autoplay-container">
      <video
        className="video"
        ref={videoRef}
        autoPlay
        loop
        playsInline
        style={{ width: "80%", height: "70%" }}
        onPlay={()=>{
          setIsPlaying(true);
        }}
        onPause={()=>{
          setIsPlaying(false);
        }}
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <audio ref={audioRef} autoPlay loop>
        <source src="/audio.mp3" type="audio/mpeg" />
      </audio>
      {!isPlaying && 
      <div 
      className=" play-icon relative flex items-center justify-center cursor-pointer transition-all duration-300"
      style={{ height: "100px", width: "100px" }}
      onClick={handlePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Glowing Circle */}
      <div
        className={`absolute inset-0 rounded-full bg-blue-500 blur-lg opacity-50 transition-opacity duration-300 ${
          isHovered ? "opacity-80" : ""
        }`}
      ></div>

      {/* Inner Circle */}
      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 to-blue-400 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
        {/* Play Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 transition-transform duration-300"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
          stroke="#fff"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.46484 3.92349C4.79896 3.5739 4 4.05683 4 4.80888V19.1911C4 19.9432 4.79896 20.4261 5.46483 20.0765L19.1622 12.8854C19.8758 12.5108 19.8758 11.4892 19.1622 11.1146L5.46484 3.92349ZM2 4.80888C2 2.55271 4.3969 1.10395 6.39451 2.15269L20.0919 9.34382C22.2326 10.4677 22.2325 13.5324 20.0919 14.6562L6.3945 21.8473C4.39689 22.8961 2 21.4473 2 19.1911V4.80888Z"
            fill="white"
          />
        </svg>
      </div>
    </div>

    
      }
      {/* <div className="play-icon" style={{height: "100px",
          width: "100px"}} onClick={handlePlay}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46484 3.92349C4.79896 3.5739 4 4.05683 4 4.80888V19.1911C4 19.9432 4.79896 20.4261 5.46483 20.0765L19.1622 12.8854C19.8758 12.5108 19.8758 11.4892 19.1622 11.1146L5.46484 3.92349ZM2 4.80888C2 2.55271 4.3969 1.10395 6.39451 2.15269L20.0919 9.34382C22.2326 10.4677 22.2325 13.5324 20.0919 14.6562L6.3945 21.8473C4.39689 22.8961 2 21.4473 2 19.1911V4.80888Z" fill="#0F0F0F"></path> </g></svg>
        </div> */}
    </div>
  );
}