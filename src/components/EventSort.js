import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateSort } from '../store/actions/index';

const EventSort = (props) => {
   const friendOptions = [
      {
        text: 'All',
        value: '',
        image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
      },
      {
        text: 'Event Date',
        value: 'Event Date',
        image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
      },
      {
        text: 'Number of People Going',
        value: 'Number of People Going',
        image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
      },
    ]

  function handleChange(e, {value}){
    props.dispatch(updateSort(value))
  }

  return (
    <Dropdown onChange={handleChange} className="event-sort" placeholder='Sort by' selection options={friendOptions} />
  )
}

export default connect()(EventSort);
