import React from "react";
import Countdown from "react-countdown";
import "./Countdown.css";

const Completionist = () => <span>The countdown is over!</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="countdown">
        <div className="countdown-item">
          <span className="countdown-label">DAYS</span>
          {String(days).padStart(2, "0")}
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <span className="countdown-label">HOURS</span>
          {String(hours).padStart(2, "0")}
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <span className="countdown-label">MINUTES</span>
          {String(minutes).padStart(2, "0")}
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <span className="countdown-label">SECONDS</span>
          {String(seconds).padStart(2, "0")}
        </div>
      </div>
    );
  }
};

const CountdownComponent = ({ targetDate }) => {
  return (
    <div style={{paddingTop: '2%'}}>
      <h6 className="timer-name">
        THE FIRST GLOBAL PUBLIC INTERGALATIC HANDSHAKE
      </h6>
      <Countdown date={targetDate} renderer={renderer} />
    </div>
  );
};

export default CountdownComponent;
