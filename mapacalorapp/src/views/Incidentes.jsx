import React from "react";
import { Map,TileLayer } from 'react-leaflet';


export default function Incidentes() {
  return <Map center={[14.094410,-87.190820]} zoom={8}>
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
  </Map>

}