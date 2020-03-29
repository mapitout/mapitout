import React from 'react';
import ReactMapGL, {Source, Layer} from 'react-map-gl';
import axios from 'axios';
import {updatePercentiles} from './utils';
import {dataLayer} from './map-style.js';

const { MAPBOX_API_KEY } = process.env;

class WorldMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2015,
      data: null,
      data2: null,
      hoveredFeature: null,
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 3
      },
    }
  }
  componentDidMount() {
    axios.get('https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson')
      .then(res => {
        // console.log(res)
        console.log(res.data)
        let data = res.data;
        this.setState({
          data: updatePercentiles(data, f => f.properties.income[this.state.year])
        })
      })
      .catch(err => console.log(err))
    axios.get('http://amazingshellyyy.com/CA-county-GEOJSON/CACounty.json')
      .then(res => {
      // console.log(res)
        console.log(res.data)
      // need to change the data structure of geojson
      // this.setState({
      //   data2: updatePercentiles(data, f => f.properties.NAME[this.state.day])
      // })
      })
      .catch(err => console.log(err))
  }

  _goToSF () {
    const viewport = {...this.state.viewport, longitude:-122.4376, latitude:37.7577}
    this.setState({viewport});
  }

  _onHover (event) {
    const {
      features,
      srcEvent: {offsetX, offsetY}
    } = event;
    const hoveredFeature = features && features.find(f => f.layer.id === 'data');

    this.setState({hoveredFeature, x: offsetX, y: offsetY});
  }

  _renderTooltip() {
    const {hoveredFeature, x, y} = this.state;

    return (
      hoveredFeature && (
        <div className="tooltip" style={{left: x, top: y}}>
          <div>State: {hoveredFeature.properties.name}</div>
          <div>Median Household Income: {hoveredFeature.properties.value}</div>
          <div>Percentile: {(hoveredFeature.properties.percentile / 8) * 100}</div>
        </div>
      )
    );
  }

  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          width="50vw"
          height="50vh"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={viewport => this.setState({viewport})}
          mapboxApiAccessToken={MAPBOX_API_KEY}
          onHover={this._onHover.bind(this)}
        >
          <Source type="geojson" data={this.state.data}>
            <Layer {...dataLayer} />
          </Source>
          {this._renderTooltip()}
        </ReactMapGL>
        <button onClick={this._goToSF.bind(this)}>Back to SF</button>
      </div>

    )
  }
}

export default WorldMap;