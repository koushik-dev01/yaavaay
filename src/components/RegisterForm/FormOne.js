import React, { useRef, useState } from "react";
import btnImg from "../images/WITH-ALPHA-CHANNEL_GIhan_BTV_Creation_2nd-option__the-better-Y-BUTTON_Fiverr-Test_.gif";
import CameraComponent from "../camera/Camera";
import { useNavigate } from 'react-router-dom';

import './form.css';

const FormOne = ({ productId, onNextStep, amount }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [capturedImageBlob, setCapturedImageBlob] = useState(null);
  const [error, setError] = useState(null);
  const [formClass, setFormClass] = useState('hide');

  const cameraRef = useRef(null);

  const totalSections = 3;
  const [formData, setFormData] = useState({
    priceId: productId,
    image: capturedImageBlob,
    firstName: "",
    lastName: "",
    email: "",
    amount
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    onNextStep(currentStep);
    if (currentStep <= 1) {
      setTimeout(() => {
        setFormClass('show');
      }, 3300);
    }
  }, [currentStep, setCapturedImageBlob]);

  const handleCapture = (blob) => {
    setCapturedImageBlob(blob);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    // Move to the next section
    setFormClass('hide');
    setTimeout(() => {
      setFormClass('show');
    }, 3600);
    setTimeout(() => {
      setCurrentStep((prevSection) =>
        prevSection < totalSections ? prevSection + 1 : prevSection
      );
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // Append other user registration data to the FormData object
      const formDataObject = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image") {
          formDataObject.append(
            key,
            capturedImageBlob,
            "captured-user-image.jpeg"
          );
        } else {
          formDataObject.append(key, value);
        }
      });

      console.log("formDataObject", formDataObject.entries);

      const response = await fetch("https://api.yaavaay.com/v2/users", {
        method: "POST",
        body: formDataObject,
      });
      if (response.ok) {
        // Handle successful API response
        const userData = await response.json();
        // Redirect to stripe checkout.
        // window.location.href = userData.checkoutUrl;
        navigate("/payment", { state: { userData } })
        // navigate("/payment", { state: { userData } })

      } else if (response.status === 400) {
        throw new Error("Bad request: the data provided is invalid");
      } else if (response.status === 401) {
        throw new Error("Unauthorized: authorization require");
      } else if (response.status === 500) {
        throw new Error(
          "Internal server error: Something went wrong on the server."
        );
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      // Handle network errors
      setError(error.message);
    }
  };

  const renderSection = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div class="spacer"></div>
            <div className="input-main">
              <div className="input-container" style={{ transform: 'unset' }}>
                <CameraComponent ref={cameraRef} onCapture={handleCapture} />
              </div>
            </div>
            <button
              onClick={(e) => { cameraRef.current?.cap(e); handleNext() }}
              type="button"
              className="button-names form-button-next"
              style={{ marginTop: 20 }}
            >
              <img src={btnImg} alt="y-logo" style={{ objectFit: "contain" }} />
            </button>
          </>
        );
      case 2:
        return (
          <>
            <div class="spacer"></div>
            <div className="input-main">
              <div className="input-container">
                <div className="any">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                    minLength={3}
                    maxLength={13}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                    minLength={3}
                    maxLength={13}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleNext}
              type="button"
              className="button-names form-button-next"
              style={{ marginTop: 20 }}
            >
              <img src={btnImg} alt="y-logo" style={{ objectFit: "contain" }} />
            </button>
          </>
        );
      case 3:
        return (
          <>
            <div class="spacer"></div>
            <div className="input-main">
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (<div className="diff-container">
    <form className={formClass} onSubmit={handleSubmit}>
      {renderSection()}
      {currentStep === totalSections && (
        <button type="submit" className="button-names form-button-next">
          <img src={btnImg} alt="y-logo" style={{ objectFit: "contain" }} />
        </button>
      )}
    </form>
    {error && <p>{error}</p>}
  </div>

  );
};

export default FormOne;
