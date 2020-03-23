import React, { Component } from 'react';
import { render } from 'react-dom';
import MapGL, { LinearInterpolator, WebMercatorViewport } from 'react-map-gl';
import bbox from '@turf/bbox';

import ControlPanel from './control-panel';
import MAP_STYLE from './map-style';
import axios from 'axios';
const VectorTile = require('@mapbox/vector-tile').VectorTile;
import Protobuf from 'pbf';

const TOKEN = process.env.MAPBOX_API_KEY; // Set your mapbox token here

export default class CACounty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -122.4,
        zoom: 11,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };

    this._map = React.createRef();
  }
  componentDidMount() {
    axios.get('https://api.mapbox.com/v4/amazingshellyyy.4inziplc/5/5/12.vector.pbf?style=mapbox://styles/amazingshellyyy/ck83x174r0nmk1ip5rcv4n00c@0&access_token=pk.eyJ1IjoiYW1hemluZ3NoZWxseXl5IiwiYSI6ImNrODNxOWRydTB2aDAzbXBndng5Y3h6ZWUifQ.Y-g83bzDXck4LEpS5tIMEQ')
      .then(res => {
        console.log(res)
        let tile = new VectorTile(new Protobuf(res.data))
        console.log(tile)
      })
      .catch(err => {
        console.log(err)
      })
  }
  long2tile(lon, zoom) { return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom))); }
  lat2tile(lat, zoom) { return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))); }

  _updateViewport(viewport) {
    this.setState({ viewport });
  };

  _onClick(event) {
    const feature = event.features[0];
    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      // construct a viewport instance from the current state
      const viewport = new WebMercatorViewport(this.state.viewport);
      const { longitude, latitude, zoom } = viewport.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
        padding: 40
      });

      this.setState({
        viewport: {
          ...this.state.viewport,
          longitude,
          latitude,
          zoom,
          transitionInterpolator: new LinearInterpolator({
            around: [event.offsetCenter.x, event.offsetCenter.y]
          }),
          transitionDuration: 1000
        }
      });
    }
  };

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        ref={this._map}
        mapStyle={MAP_STYLE}
        interactiveLayerIds={['counties']}
        {...viewport}
        width="100%"
        height="100%"
        onClick={this._onClick.bind(this)}
        onViewportChange={this._updateViewport.bind(this)}
        mapboxApiAccessToken={TOKEN}
      >
        <ControlPanel containerComponent={this.props.containerComponent} />
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<CACounty />, container);
}