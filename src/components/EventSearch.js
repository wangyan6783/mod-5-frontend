import React from 'react';
import { Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateSearch } from '../store/actions/index';

const EventSearch = (props) => {
  return (
    <label>
      <Input className="event-search" onChange={e => props.dispatch(updateSearch(e.target.value))} size='large' icon='search' placeholder='Search...' />
    </label>
  )
}

export default connect()(EventSearch);
