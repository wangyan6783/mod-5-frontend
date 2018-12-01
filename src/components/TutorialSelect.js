import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateTutorialSelect } from '../store/actions/index';

const TutorialSelect = (props) => {
  return (
    <Fragment>
      <div className="tutorial-button-container">
        <Button secondary onClick={(e, data) => props.updateTutorialSelect(data.children)
        }>Skiing</Button>
        <Button secondary onClick={(e, data) => props.updateTutorialSelect(data.children)}>Snowboarding</Button>
      </div>
    </Fragment>
  )
}

export default connect(null, { updateTutorialSelect })(TutorialSelect);
