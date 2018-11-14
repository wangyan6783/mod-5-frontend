import React, { Fragment } from 'react';
import homepageVideo from '../images/homepage-video.mp4';
import homepageOverlay from '../images/homepage-overlay.png';


const HomePage = () => {
  return (
    <Fragment>
      <div className="homepage">
        <div className="homepage-video">
          <video loop autoPlay>
             <source src={homepageVideo} type="video/mp4" />
          </video>
          <img className="homevideo-overlay" src={homepageOverlay} />
        </div>
     </div>
    </Fragment>
  )
}

export default HomePage


  // <img src="https://www.rei.com/content/dam/images/Expert%20Advice/Migration/HeroImages/Content_Team_082817_18850_Snowboards_Choose_lg.jpg" alt="" height="550px" width="960px" />

    // <video src={homepageVideo} />
