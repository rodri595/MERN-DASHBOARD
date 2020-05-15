import React, { Component } from 'react'

import {Map, TileLayer, Marker, Popup, FeatureGroup, LayerGroup, LayersControl, CircleMarker, Tooltip, GeoJSON } from 'react-leaflet'

import L from 'leaflet';

import "leaflet/dist/leaflet.css";

const { BaseLayer, Overlay } = LayersControl

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


export default class Investigacion extends Component{
    constructor(props) {
        super(props);
        this.state = {
          currentPos: null
        };
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick(e){
        this.setState({ currentPos: e.latlng });
      }


  render() {
    
    return (
        <Map minZoom={2.5} onClick={this.handleClick} 
        bounds={[
            [16.488038, -83.323866],
            [13.125772, -89.520875]
          ]}>
        <LayersControl position="topleft">

          <BaseLayer checked name=" Mapa Base   ">

            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer  name=" Mapa Calle   ">

            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
            />
          </BaseLayer>

          <BaseLayer  name="  Mapa Darkmode   ">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </BaseLayer>


          <Overlay checked name=" Crear Marador   ">
          <LayerGroup>
        { this.state.currentPos && <Marker position={this.state.currentPos} draggable={true}>
            <Popup position={this.state.currentPos}>
              Coordenadas: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
            </Popup>
          </Marker>}
          </LayerGroup>
          </Overlay>

          </LayersControl>
      </Map>
    )
  }
}