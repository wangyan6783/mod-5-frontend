import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Tutorial from './Tutorial';
import { Card } from 'semantic-ui-react';
import { updateTutorialSelect } from '../store/actions/index';

class TutorialList extends Component {

  componentDidMount(){
    this.props.dispatch(updateTutorialSelect("snowboard tricks"))
  }

  render(){
    return (
      <Fragment>
        <Card.Group itemsPerRow={3}>
        {this.props.tutorials.items ? this.props.tutorials.items.map(tutorial => <Tutorial key={tutorial.id.videoId} tutorial={tutorial}/>) : null}
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
