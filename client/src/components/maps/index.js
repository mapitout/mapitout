import React from 'react'
import MapGL, { GeolocateControl, NavigationControl, Marker } from 'react-map-gl';
import MAP_STYLE from './map-styles'
import Geocoder from 'react-map-gl-geocoder';
import qs from 'qs';
import _ from 'lodash';
import { connect } from 'react-redux';

import { changeFocusport, resetFocusport } from '../../actions';
import Item from '../item';
import request from '../../redux/request';

const FOCUS_ZOOM = 16;
const MAX_ZOOM = 9.7;
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
const BOUNDARY_OF_CA = [-124.409591, 32.534156, -114.131211, 42.009518];  // boundary of California
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPins: [],
      viewport: {
        width: '100%',
        height: '100%',
        latitude: 37.560955658709936,
        longitude: -122.17270585027846,
        zoom: MAX_ZOOM,
        transitionDuration: 400
      },
      focused: false
    }
    this.mapRef = React.createRef()
    this.geocoderContainerRef = React.createRef()
  }
  handleResize() {
    const { focusport } = this.props;
    if(focusport.latitude && focusport.longitude) {
      this.setState({ ...this.state, 
        viewport: { ...this.state.viewport, width: '100%', height: '100%', latitude: focusport.latitude, longitude: focusport.longitude, transitionDuration: 0 }
      });
    }
    this.setState({ ...this.state, 
      viewport: { ...this.state.viewport, width: '100%', height: '100%', transitionDuration: 0 }
    });
  }
  componentDidMount() {
    this.init()
  }
  init() {
    const query = qs.parse(window.location.href.split('?')[1]);
    const lat = Number(query.lat);
    const lon = Number(query.lon);
    if(query.lat && query.lon) {
      this.setState({ ...this.state,
        focused: true,
        viewport: { ...this.state.viewport, latitude: lat, longitude: lon, transitionDuration: 0, zoom: FOCUS_ZOOM }
      })
      this.props.changeFocusport({
        ...this.props.focusport,
        input: query.q || '',
        longitude: lon,
        latitude: lat
      })
    }else{
      navigator.geolocation.getCurrentPosition(this.getLocation.bind(this), console.error, { enableHighAccuracy: true })
    }
    request.get('/publicApi/item')
      .then(({data})=>{
        this.setState({
          ...this.state,
          allPins: data.items
        })
        localStorage.setItem('mapitout-last-update-time', Date.now())
      })
      .catch(e=>console.error(e));
    window.addEventListener('resize', _.debounce(this.handleResize.bind(this), 200));
  }
  getLocation({ coords: { latitude, longitude } }) {
    this.setState({ ...this.state,
      focused: true,
      viewport: { ...this.state.viewport, latitude, longitude, zoom: FOCUS_ZOOM-4 }
    })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  updateURL(params) {
    if (window.history.replaceState) {
      window.history.replaceState({}, '', `/#/maps?${params}`);
    }
  }
  onMapGLViewportChange(v) {
    if(v.zoom < MAX_ZOOM) v.zoom = MAX_ZOOM;
    this.setState({...this.state, viewport: v})
  }
  onGeocoderLoading({ query }) {
    const uri_params = qs.stringify({
      q: query
    })
    this.updateURL(uri_params)
  }
  onGeocoderViewpointChange(v) {
    this.setState({...this.state, focused: true});
    this.setState({ ...this.state, viewport: { ...v, transitionDuration: 300, zoom: FOCUS_ZOOM } })
  }
  onGeocoderSelected(i) {
    const uri_params = qs.stringify({
      lon: i.result.center[0],
      lat: i.result.center[1],
      q: i.result.place_name
    })
    this.setState({ ...this.state, focused: true });
    this.props.changeFocusport({
      ...this.props.focusport,
      input: i.result.place_name,
      longitude: i.result.center[0],
      latitude: i.result.center[1]
    })
    this.updateURL(uri_params)
  }
  onClickMarket(m) {
    this.setState({ ...this.state, focused: true });
    const uri_params = qs.stringify({
      lon: m.longitude,
      lat: m.latitude,
      q: m.title
    })
    this.updateURL(uri_params)
    this.props.changeFocusport({
      ...this.props.focusport,
      input: m.title,
      longitude: m.longitude,
      latitude: m.latitude
    })
  }
  renderAllPins(pins) {
    const { focusport } = this.props;
    return (<div>{pins && pins.length > 0 && pins
      .filter(pin=>(pin.latitude !== focusport.latitude))
      .map(pin=>(
        <Marker key={pin._id}
          latitude={pin.latitude}
          longitude={pin.longitude}
        >
          <PinMarket onClick={this.onClickMarket.bind(this, pin)} type='display'/>
        </Marker>
      ))}</div>)
  }
  onGeocoderClear() {
    this.setState({ ...this.state, focused: false });
    this.props.resetFocusport({
      ...this.props.focusport,
    })
    this.updateURL('')
  }
  render() {
    const { focused, viewport } = this.state;
    const { focusport } = this.props;
    return (
      <div className='map-view-outter-container'>
        <div className={`map-info-drawer-container search`} ref={this.geocoderContainerRef}/>
        <div className={`map-info-drawer-container ${focused} info`}>
          {focused && <div className='item-view-container'>
            <Item />
          </div>}
        </div>
        <div className='map-view-conatiner'>
          <MapGL
            ref={this.mapRef}
            mapboxApiAccessToken={MAPBOX_API_KEY}
            {...viewport}
            onViewportChange={this.onMapGLViewportChange.bind(this)}
            mapStyle={MAP_STYLE.MAPITOUT_LIGHT}
          >
            <Geocoder
              onClear={this.onGeocoderClear.bind(this)}
              onLoading={this.onGeocoderLoading.bind(this)}
              onViewportChange={this.onGeocoderViewpointChange.bind(this)}
              onResult={this.onGeocoderSelected.bind(this)}
              inputValue={focusport.input}
              containerRef={this.geocoderContainerRef}
              mapRef={this.mapRef}
              mapboxApiAccessToken={MAPBOX_API_KEY}
              position='top-left'
              enableEventLogging={false}
              limit={10}
              countries='us'
              placeholder='Search On The Map'
              collapsed={false}
              trackProximity={true}
              bbox={BOUNDARY_OF_CA}
            />
            {<Marker key={focusport.input}
              latitude={focusport.latitude}
              longitude={focusport.longitude}
            >
              <PinMarket type='focused'/>
            </Marker>}
            {this.renderAllPins(this.state.allPins)}
            <div className='ctrl-panel-container'>
              <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
                showAccuracyCircle={true}
                showUserLocation={true}
                timeout={60000}
              />
              <NavigationControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
              />
            </div>
          </MapGL>
        </div>
      </div>
    )
  }
}

function PinMarket(props){
  return (<div {...props} className={`pin-001 ${props.type}`}>
    <button className='button-inner'>
      <div className='pin-001-wrapper'>
        <div className='pin-001-wrapper-item'></div>
        <div className='pin-001-wrapper-item-wrapper'>
          <svg viewBox="0 0 24 24" role="presentation" focusable="false">
            <path d="m10.3763831 16.9958031c-.6091534.0521629-1.14605321-.3879614-1.19940971-.9834877-.12005213-1.3464543-1.24943145-4.7696434-4.97327072-4.4512325-.60915341.0521629-1.14605322-.3879614-1.19940973-.9834877-.0533565-.59661292.39683899-1.12041518 1.0059924-1.17257807 3.72495087-.31949764 4.22739128-3.88287447 4.10733914-5.22824212-.0533565-.59552623.396839-1.12041522 1.00599241-1.1725781s1.14605321.38796143 1.19940971.98348765c.1211637 1.34645438 1.2483199 4.76964347 4.9732707 4.45123254.6091534-.05216288 1.1460533.38796143 1.1994098.98348766.0533565.59661294-.396839 1.12041524-1.0059924 1.17257814-3.7249509.3194976-4.2273913 3.8828744-4.1073392 5.2282421.0533565.5955262-.396839 1.1204152-1.0059924 1.1725781zm7.584852.0683599c.2409587 1.3598115-.6664817 2.6570676-2.0250791 2.8970344-1.3596226.2409922-2.6566986-.6655488-2.8976573-2.0253604-.2399334-1.3598115.6664817-2.6570676 2.0261044-2.8970344 1.3585973-.2409922 2.6556732.6655488 2.896632 2.0253604zm2.0155617-4.8253807c.1443571.8157325-.3998465 1.5936573-1.2155791 1.7380145-.8157325.1443571-1.5936573-.3998465-1.7380145-1.2155791-.1443571-.8145869.3998465-1.5936573 1.2155791-1.7380145.8157325-.1443571 1.5936573.3998465 1.7380145 1.2155791z"></path>
          </svg>
        </div>
        <div className='pin-001-item-2'>
        </div>
      </div>
    </button>
  </div>)
}

function mapStateToProps({item}) {
  const { focusport } = item;
  return { focusport };
}

export default connect(mapStateToProps, { changeFocusport, resetFocusport })(Index);
