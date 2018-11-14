import React, { Fragment } from 'react';
import homepageVideo from '../images/homepage-video.mp4';
import homepageOverlay from '../images/homepage-overlay.png';


const HomePage = () => {
  return (
    <Fragment>
        <div className="homepage-video">
          <video loop autoPlay>
             <source src={homepageVideo} type="video/mp4" />
          </video>
        </div>
        <div className="homepage-overlay">
          <img src={homepageOverlay} alt="snow hub homepage" />
        </div>

    </Fragment>
  )
}

export default HomePage
