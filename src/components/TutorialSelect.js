import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateTutorialSelect } from '../store/actions/index';

const TutorialSelect = (props) => {
  return (
    <Fragment>
      <Button onClick={(e, data) => props.dispatch(updateTutorialSelect(data.children))
        }>Ski Tutorials</Button>
      <Button onClick={(e, data) => props.dispatch(updateTutorialSelect(data.children))}>Snowboard Tutorials</Button>
    </Fragment>
  )
}

export default connect()(TutorialSelect);
