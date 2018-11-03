import React from 'react';
import { NavLink } from 'react-router-dom';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';


const Resort = ({resort}) => {

  const icon = L.icon({
      iconUrl: 'https://cdn2.iconfinder.com/data/icons/sports-attitudes/1451/skying-512.png',
      iconSize:     [20, 20],
      iconAnchor:   [0, 0],
      popupAnchor:  [0, 0]
  });

  const resortLocation = (resort) => [Number(resort.latitude), Number(resort.longitude)]

  return (
    <Marker position={resortLocation(resort)} icon={icon}>
      <Popup>
        <img src={resort.image_url} alt="Smiley face" height="200" width="300"/>
        <h2>{resort.name}</h2>
        <p>{resort.region}</p>
        <NavLink exact to={`/resorts/${resort.id}`}><button>View Details</button></NavLink>
      </Popup>
    </Marker>
  )
}

export default Resort
