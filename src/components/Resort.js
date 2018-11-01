import React from 'react';
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
        <img src="https://static.standard.co.uk/s3fs-public/thumbnails/image/2016/10/18/18/meribel.jpg" alt="Smiley face" height="200" width="300"/>
        <h2>{resort.name}</h2>
        <p>{resort.region}</p>
        <button>Events</button>
        <a href={resort.website_url ? resort.website_url : "https://www.parkcitymountain.com/explore/seize-the-season?CMPID=PPC_DEST_PC_BRAND_NA&gclid=Cj0KCQjwguDeBRDCARIsAGxuU8b00eMm8UJXo9E_1ICPCHZGRhjfCygZqLBaemGu9cswFAsFx2fxE2QaAtYQEALw_wcB"}  target="_blank"><button>Official Website</button></a>
      </Popup>
    </Marker>
  )
}

export default Resort
