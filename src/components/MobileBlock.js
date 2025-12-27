import { isMobile } from 'react-device-detect';

const MobileBlock = ({ children }) => {
  if (isMobile) {
    return (
      <div className='mobile-container'>
        <p className='mobile-info'>
        DUE TO ENHANCED PROTECTION AND SECURITY, THIS PUBLIC WEBSITE IS LIMITED TO DESKTOP USE ONLY FOR STRONGER PRIVACY.
        </p>
      </div>
    );
  }

  return children;
};

export default MobileBlock;