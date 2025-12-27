import React, { useState, useEffect } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
  TumblrShareButton,
  TumblrIcon,
  TelegramShareButton,
  TelegramIcon,
  VKShareButton,
  VKIcon,
  PinterestShareButton,
  PinterestIcon,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  ViberShareButton,
  ViberIcon,
  PocketShareButton,
  PocketIcon,
} from "react-share";
import youtube1 from "./images/youtube1.png";
import kakao from "./images/kakao.png";
import blogger from "./images/blogger.png";
import tiktok from "./images/tiktok.png";
import white from "./images/shareicon2.gif";
import logo from './images/WITH-ALPHA-CHANNEL_GIhan_BTV_Creation_2nd-option__the-better-Y-BUTTON_Fiverr-Test_.gif';

export default function ShareButton() {
  const shareUrl = "https://yaavaay.com/";
  const title = "check out this webpage";

  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShareClick = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleCloseClick = () => {
    setShowShareMenu(false);
  };
  const handleYouTubeShare = () => {
    const youtubeShareUrl = `https://www.youtube.com/share?url=${shareUrl}`;
    window.open(youtubeShareUrl, "_blank");
  };
  const handleKakao = () => {
    const kakaoTalkShareUrl = `https://sharer.kakao.com/talk/friends/picker/link?u=${shareUrl}`;
    window.open(kakaoTalkShareUrl);
  };
  const handleBlogger = () => {
    const bloggerShareUrl = `https://www.blogger.com/blog-this.g?u=${shareUrl}&n=${title}`;
    window.open(bloggerShareUrl);
  };
  const handleTikTokShare = () => {
    const tiktokUrl = "https://www.tiktok.com/tag/yaavaay";
    window.open(tiktokUrl, "_blank");
  };

  useEffect(() => {
    const scrollToShare = () => {
      if (window.location.hash === "#share") {
        setTimeout(() => {
          const element = document.getElementById("share");
          if (element) {
            const headerOffset = 200;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;
  
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    };
  
    scrollToShare();

    window.addEventListener("hashchange", scrollToShare);
  
    return () => {
      window.removeEventListener("hashchange", scrollToShare);
    };
	}, []);
  return (
    /* eslint-disable */
    <div id="share" className="share-container" style={{ position: 'relative', height: '200px', paddingTop: '50px', marginTop: '100px' }}>
      <span
        className="icon"
        onClick={() => handleShareClick()}
        role="button"
        tabIndex={0}
      >
        <img
          className="share-social-icon"
          src={white}
          size="2x"
          style={{
          }}
        />
      </span>
      {showShareMenu && (
        <div className="popup" style={{ position: 'absolute', top: '140px' }}>
          <div className="container-icone">
            <span
              className="popup-close-icon"
              onClick={() => handleCloseClick()}
              role="button"
              tabIndex={0}
            >
              &#x2716;
            </span>
          </div>
          <div className="sharepopup-content">
            <div className="social-media">
              <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} quote={title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} quote={title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <LinkedinShareButton url={shareUrl} quote={title}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
              <EmailShareButton url={shareUrl} quote={title}>
                <EmailIcon size={32} round />
              </EmailShareButton>
              <RedditShareButton url={shareUrl} quote={title}>
                <RedditIcon size={32} round />
              </RedditShareButton>
              <TumblrShareButton url={shareUrl} quote={title}>
                <TumblrIcon size={32} round />
              </TumblrShareButton>

              <TelegramShareButton url={shareUrl} quote={title}>
                <TelegramIcon size={32} round />
              </TelegramShareButton>
              <VKShareButton url={shareUrl} quote={title}>
                <VKIcon size={32} round />
              </VKShareButton>
              <PinterestShareButton
                url={shareUrl}
                media={logo}
                className="Demo__some-network__share-button"
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
              <span onClick={handleYouTubeShare}>
                <img className="circular-image" src={youtube1} />
              </span>
              <span onClick={handleKakao}>
                <img className="circular-image" src={kakao} />
              </span>
              <span onClick={handleBlogger}>
                <img className="circular-image" src={blogger} />
              </span>
              <span onClick={handleTikTokShare}>
                <img className="circular-image" src={tiktok} />
              </span>
              <ViberShareButton url={shareUrl} quote={title}>
                <ViberIcon size={32} round />
              </ViberShareButton>
              <PocketShareButton url={shareUrl} quote={title}>
                <PocketIcon size={32} round />
              </PocketShareButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
