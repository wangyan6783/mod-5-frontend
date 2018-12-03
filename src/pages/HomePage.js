import React, { Fragment } from 'react';
import homepageVideo from '../images/home-video.mp4';
import homepageOverlay from '../images/homepage-overlay.png';


const HomePage = () => {
  return (
    <Fragment>
        <div className="homepage">
          <div className="video-wrapper">
          <video src={homepageVideo} autoPlay="true" loop="true"></video>
        </div>
        <img src={homepageOverlay} alt="snow hub homepage" />
        </div>
    </Fragment>
  )
}

export default HomePage

// <source src={homepageVideo} />
