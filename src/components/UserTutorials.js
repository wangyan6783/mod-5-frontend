import React, { Fragment } from 'react';
import UserTutorial from './UserTutorial';
import { Card } from 'semantic-ui-react';

const UserTutorials = (props) => {
  return (
    <Fragment>
      <Card.Group itemsPerRow={3}>
      {props.tutorials.map(tutorial => <UserTutorial key={tutorial.id} tutorial={tutorial}/>)}
      </Card.Group>
    </Fragment>
  )
}

export default UserTutorials
