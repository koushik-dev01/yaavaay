import React from "react";
import PropTypes from "prop-types";
import CubeVideoComponent from "./cube-video/CubeVideo";
import './RegisterForm/form.css';

const ButtonPopup = ({ isOpen, onClose, children, step }) => {
  if (!isOpen) return null;

  let stopTimeAt = 0;
  if (step === 1) {
    stopTimeAt = 2;
  } else if (step === 2) {
    stopTimeAt = 5.5;
  } else if (step === 3) {
    stopTimeAt = 9.0;
  }

  return (
    <div className={"link-container" + (isOpen ? ' open': '') }>
      <div className="popup-container">
        <div className="popup">
          <div className="popup-content">
            <span
              className="close-icon"
              onClick={() => {
                onClose();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onClose();
                }
              }}
              role="button"
              tabIndex="0"
            >
              &#x2716;
            </span>

            {/* Video section */}
            <CubeVideoComponent stopTime={stopTimeAt} />

            <div className="diff-container">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

ButtonPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired, // 'isOpen' should be a required boolean
  onClose: PropTypes.func.isRequired, // 'onClose' should be a required function
  children: PropTypes.node, // 'children' can be any renderable React node
};

ButtonPopup.defaultProps = {
  children: null, // You can provide a default value here if needed
};

export default ButtonPopup;
