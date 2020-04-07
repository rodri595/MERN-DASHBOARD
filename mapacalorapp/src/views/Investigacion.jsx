import React, { Component } from 'react';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { Icon } from "leaflet";
import MapaForm from '../mapa/MapaForm.jsx';
import MapaType from 'mapa/MapaType/MapaType.jsx';

import { 
  Map, 
  CircleMarker, 
  TileLayer, 
  Tooltip, 
  Marker, 
  Popup  
} from "react-leaflet";


import data from '../mapa/city';
import {getLocation} from '../mapa/api';

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

export default class Investigacion extends Component {
  state = {
    location:{
      lat: 14.094410,
      lng: -87.190820
    },
    userlocation: false,
    zoom: 2,
    tipomapa:'Base'
  }
  MapaCambio = (Tipo) => {
    this.setState({
      tipomapa: Tipo
    });
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location : {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        userlocation: true,
        zoom:8
      });
    },()=> {
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(location => {
          this.setState( {
            location:{
            lat: location.latitude,
            lng: location.longitude
          },
          userlocation: true,
        zoom:8
          })
        });
      });
    }
    render() {
      const position = [this.state.location.lat, this.state.location.lng];
      const tiposmapa = {
        Base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        Calle: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
      }
      
      return (
        <div className="map">
        <Map center={position} zoom={this.state.zoom}>
        
        <TileLayer
          url={tiposmapa[this.state.tipomapa]}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
        <MapaType tipomapa={this.state.tipomapa} onChange={this.MapaCambio}/>



        <CircleMarker center={[14.848820,-85.894241]} radius={20} fillOpacity={0.5} stroke={true}>
          <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
            <span>{"Catacamas"}</span>
          </Tooltip>
        </CircleMarker>




          {
            this.state.userlocation ?
            
            <Marker position={position} Icon={Icon}>
              <Popup>HOLA</Popup>
            </Marker> : ''
          }

          <MapaForm style={{position:"absolite"}}/>
        </Map>
      </div>
    );
  }
}

/////////////////Demo///////////////////
// import React, { Component } from 'react';
// import { Map, CircleMarker, TileLayer, Tooltip } from "react-leaflet";
// import { Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';

// import "leaflet/dist/leaflet.css";
// import data from '../mapa/city';
// import {getLocation} from '../mapa/api';

// export default class Investigacion extends Component {
//   componentDidMount() {
    
//   }
//   render() {
//     var centerLat = (data.minLat + data.maxLat) / 2;
//     var distanceLat = data.maxLat - data.minLat;
//     var bufferLat = distanceLat * 0.05;
//     var centerLong = (data.minLong + data.maxLong) / 2;
//     var distanceLong = data.maxLong - data.minLong;
//     var bufferLong = distanceLong * 0.15;
//     return (
//       <div>
//         <Map zoom={1} center={[centerLat, centerLong]}
//         bounds={[
//           [data.minLat - bufferLat, data.minLong - bufferLong],
//           [data.maxLat + bufferLat, data.maxLong + bufferLong]
//         ]}>
//           <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={[14.094410,-87.190820]}>
//             <Popup> HOLA </Popup>
//           </Marker>
//           {data.city.map((city) => {
//             return (
//               <CircleMarker
//                   center={[city["coordinates"][1], city["coordinates"][0]]}
//                   radius={20 * Math.log(city["population"] / 10000000)} fillOpacity={0.5} stroke={false}>
//                   <Tooltip direction="left" offset={[-8, -2]} opacity={1}>
//                     <span>{city["name"] + ": " + "Population" + " " + city["population"]}</span>
//                   </Tooltip>
//               </CircleMarker> )
//           })
//           }
//         </Map>
//       </div>
//     );
//   }
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

