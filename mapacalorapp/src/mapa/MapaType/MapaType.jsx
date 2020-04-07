import React from 'react';


export default class MapaType extends React.Component {
  onChange = (e) => {
    var Tipo = e.currentTarget.value;

    if (this.props.onChange) {
      this.props.onChange(Tipo);
    }
  }

  render() {
    return (
      <div className="basemaps-container">
        <select value={this.props.tipomapa} onChange={this.onChange}>
          <option value="Base">Mapa Base</option>
          <option value="Calle">Mapa Calle</option>
        </select>
      </div>
    );
  }
};