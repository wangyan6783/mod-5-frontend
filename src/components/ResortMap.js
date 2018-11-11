import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer } from 'react-leaflet';
import Resort from './Resort';
import { fetchResorts } from '../store/actions/index';
import resortMapBackground from '../images/resort-map-background.png';

class ResortMap extends Component {

  state = {
   location: {
     lat: 0,
     lng: 0
   },
   zoom: 1
 }

  componentDidMount(){
    this.props.dispatch(fetchResorts())

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
      <Fragment>
        <div className="resort-map-container">
          <img className="resort-map-background" src={resortMapBackground} alt="" />
          <Map className="resort-map" center={position} zoom={this.state.zoom}>
           <TileLayer
             url='http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
           />
         {this.props.resorts.map(resort => <Resort key={resort.id} resort={resort} />)}
         </Map>
       </div>
     </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    resorts: state.resortReducer.resorts
  }
}

export default connect(mapStateToProps)(ResortMap);

// 'https://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}'
