import React, { Fragment } from 'react';
import EventList from '../components/EventList';
import EventSearch from '../components/EventSearch';
import EventSort from '../components/EventSort';

const EventsPage = () => {
  return (
    <Fragment>
      <EventSearch />
      <EventSort />
      <EventList />
    </Fragment>
  )
}

export default EventsPage
