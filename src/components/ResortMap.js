import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Resort from './Resort';

class ResortMap extends Component {

  state = {
   location: {
     lat: 0,
     lng: 0
   },
   zoom: 1,
   resorts: []
 }

  componentDidMount(){
    fetch("http://localhost:3001/api/v1/resorts")
    .then(response => response.json())
    .then(resorts => this.setState({resorts}))

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        zoom: 5
      })
    }, () => {
      fetch("https://ipapi.co/json")
      .then(response => response.json())
      .then(location => {
        this.setState({
          location: {
            lat: location.latitude,
            lng: location.longitude
          },
          zoom: 5
        })
      })
    })
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng]

    return (
      <Map className="resort-map" center={position} zoom={this.state.zoom}>
       <TileLayer
         attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
     {this.state.resorts.map(resort => <Resort key={resort.id} resort={resort} />)}
     </Map>
    )
  }
}

export default ResortMap
