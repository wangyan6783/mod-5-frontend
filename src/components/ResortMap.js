import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer } from 'react-leaflet';
import Resort from './Resort';
import { fetchResorts } from '../store/actions/index';

class ResortMap extends Component {

  state = {
   location: {
     lat: 0,
     lng: 0
   },
   zoom: 5
 }

  componentDidMount(){
    this.props.dispatch(fetchResorts())

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    })
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng]

    return (
      <Fragment>
        <div className="resort-map-container">
          <Map className="resort-map" center={position} zoom={this.state.zoom}>
            <TileLayer
             url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
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
