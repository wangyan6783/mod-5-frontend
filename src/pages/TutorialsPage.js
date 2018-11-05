import React, { Fragment } from 'react';
import TutorialSelect from '../components/TutorialSelect';
import TutorialList from '../components/TutorialList';

const TutorialsPage = () => {
  return (
    <Fragment>
      <TutorialSelect />
      <TutorialList />
    </Fragment>
  )
}

export default TutorialsPage
