import React, { Fragment } from 'react';
import UserTutorial from './UserTutorial';
import { Card } from 'semantic-ui-react';
import noTutorials from '../images/no-tutorials.png';

const UserTutorials = (props) => {
  if (props.tutorials.length !== 0) {
    return (
      <Fragment>
        <Card.Group itemsPerRow={3}>
          {props.tutorials.map(tutorial => <UserTutorial key={tutorial.id} tutorial={tutorial}/>)}
        </Card.Group>
      </Fragment>
    )
  } else {
    return <img src={noTutorials} width="720px" height="400px"/>
  }
}

export default UserTutorials
