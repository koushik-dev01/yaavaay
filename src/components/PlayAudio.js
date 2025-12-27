import React, { useState, useEffect, useRef } from "react";

export default function PlayAudio() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
        // Show loading animation.
     audio.play();
    }
  }, []);

  return (
    <>
      
      <audio ref={audioRef} autoPlay loop>
        <source src="/audio.mp3" type="audio/mpeg" />
      </audio>
     
    </>
  );
}
