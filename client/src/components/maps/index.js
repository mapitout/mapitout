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
function isMobileFnc() {
  let check = false;
  // eslint-disable-next-line no-useless-escape
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}
var isMobile = isMobileFnc();
const FOCUS_ZOOM = isMobile ? 15 : 16;
const MAX_ZOOM = isMobile ? 8 : 9.5;
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
  onGeocoderOnResults(e) {
    console.log('onGeocoderOnResults')
    console.log(e)
    const query = e.query[0];
    const list = e.features;
    // step 1
    // write code to render the list

    // step 2
    // this.onGeocoderSelected({
    //   result: {
    //     center: [long, lat],
    //     place_name: ''
    //   }
    // })
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
              // onResult={this.onGeocoderSelected.bind(this)}
              onResults={this.onGeocoderOnResults.bind(this)}
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
