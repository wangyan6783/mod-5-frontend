import React from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { Button } from 'semantic-ui-react';


const Resort = ({resort}) => {

  const icon = L.icon({
      iconUrl: 'https://cdn2.iconfinder.com/data/icons/sport-glyphsporticons/340/alpineskiing-512.png',
      iconSize:     [25, 25],
      iconAnchor:   [0, 0],
      popupAnchor:  [0, 0]
  });

  const resortLocation = (resort) => [Number(resort.latitude), Number(resort.longitude)]

  return (
    <Marker position={resortLocation(resort)} icon={icon}>
      <Popup>
        <img src={resort.image_url} alt={resort.name} height="200" width="300"/>
          <h2 className="text-center">{resort.name}</h2>
          <h4 className="text-center">{resort.region}</h4>
        <div className="resort-btn-container">
          <Link to={`/resorts/${resort.id}`}><Button secondary>View Events</Button></Link>
          <a href={resort.website_url} target="_blank" rel="noopener noreferrer"><Button secondary>Visit Website</Button></a>
        </div>
      </Popup>
    </Marker>
  )
}

export default Resort
