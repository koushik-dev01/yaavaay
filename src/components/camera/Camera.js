import React, { useState, useCallback, useImperativeHandle, forwardRef } from "react";
import Webcam from "react-webcam";
import "./Camera.css";
import userDefaultImage from "../images/user.png";

const CameraComponent = forwardRef(({ onCapture }, ref) => {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const webcamRef = React.useRef(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  const capture = (e) => {
    e.preventDefault();

    const imageSrc = isWebcamActive ? webcamRef.current.getScreenshot() : userDefaultImage;

    // Convert data URL to blob
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        onCapture(blob); // Pass blob to parent
      });
  };

  useImperativeHandle(ref, () => ({
    cap: (e) => {
      capture(e);
    }
  }));


  React.useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const permission = await navigator.permissions.query({ name: "camera" });
        setCameraPermission(permission.state);

        // Listen for permission changes
        permission.onchange = () => setCameraPermission(permission.state);
      } catch (error) {
        console.error("Permission API not supported or camera access denied", error);
        setCameraPermission("not supported");
      }
    };

    checkCameraPermission();
  }, []);

  console.log("llml:", cameraPermission,cameraPermission ==="granted")

  return (
    <div>
      <div>
        <img
          src={userDefaultImage}
          alt="Default"
          className="overlay-image"
          style={{
            position: (isWebcamActive)?"absolute": "unset",
            zIndex: '1', 
            content: "center"
          }}
        />
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="round-image"
          mirrored={true}
          onUserMedia={() => setIsWebcamActive(true)}
          style={{ display: isWebcamActive ? "block" : "none" }}
        />
      </div>
    </div>
  );
});

/*
remove photo button in case we need it in the future
{imageSrc ? (
        <div>
          <img src={imageSrc} alt="Captured" className="round-image" />
          <button
            onClick={removeImage}
            className="capture-button"
            style={{ display: isWebcamActive ? "block" : "none" }}
          >
            Remove
          </button>
        </div>
      ) : 


Capture button in case we need it in the future
<button
            onClick={capture}
            className="capture-button"
            style={{ display: isWebcamActive ? "block" : "none" }}
          >
            Capture
          </button>
*/

export default CameraComponent;
