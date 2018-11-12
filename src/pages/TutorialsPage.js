import React, { Fragment } from 'react';
import TutorialSelect from '../components/TutorialSelect';
import TutorialList from '../components/TutorialList';

const TutorialsPage = () => {
  return (
    <Fragment>
      <div className="tutorials-page">
        <TutorialSelect />
        <TutorialList />
      </div>
    </Fragment>
  )
}

export default TutorialsPage
