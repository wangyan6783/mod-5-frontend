import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Tutorial from './Tutorial';
import { Card } from 'semantic-ui-react';

class TutorialList extends Component {

  render(){
    return (
      <Fragment>
        <Card.Group itemsPerRow={3}>
        {this.props.tutorials.items ? this.props.tutorials.items.map(tutorial => <Tutorial key={tutorial.id} tutorial={tutorial}/>) : null}
        </Card.Group>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    tutorials: state.tutorialReducer.tutorials
  }
}

export default connect(mapStateToProps)(TutorialList)
