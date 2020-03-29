import React from 'react'
import MapGL, { GeolocateControl, NavigationControl, Marker } from 'react-map-gl';
import MAP_STYLE from './map-styles'
import Geocoder from 'react-map-gl-geocoder';
import qs from 'qs';
import _ from 'lodash';
import Item from '../item';

const ZOOM = 16;
const Index = () => {
  const [viewport, setViewport] = React.useState({
    width: '100%',
    height: '100%',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: ZOOM,
    transitionDuration: 400
  });
  const [focused, setFocused] = React.useState(false)
  const [focusport, setFocusport] = React.useState({
    key: '',
    latitude: 0,
    longitude: 0,
    name: '',
    detail: {}
  })

  window.addEventListener('resize', _.debounce(function (d) {
    setViewport({ ...viewport, width: '100%', latitude: focusport.latitude, longitude: focusport.longitude, height: '100%', transitionDuration: 0 })
  }, 200));
  function onGeocoderSelected(v) {
    setFocused(true);
    setFocusport({
      ...focusport,
      key: 'current-focused-item',
      longitude: v.longitude,
      latitude: v.latitude
    })
    setViewport({ ...viewport, ...v, transitionDuration: 300 })
  }
  function onInputChange(input) {
    const uri_params = qs.stringify({
      lon: input.result.center[0],
      lat: input.result.center[1],
      q: input.result.place_name
    })
    setFocused(true);
    setFocusport({
      ...focusport,
      name: input.result.place_name,
      longitude: input.result.center[0],
      latitude: input.result.center[1]
    })
    updateURL(uri_params)
  }
  function updateURL(params) {
    if (window.history.replaceState) {
      window.history.replaceState({}, '', `/#/maps?${params}`);
    }
  }
  function onGeocoderLoading({ query }) {
    const uri_params = qs.stringify({
      q: query
    })
    updateURL(uri_params)
  }
  React.useEffect(() => {
    const dict = qs.parse(window.location.href.split('?')[1])
    let longitude = Number(dict.lon)
    let latitude = Number(dict.lat)
    let name = dict.q
    if (name) setFocusport({ ...focusport, name });
    if (dict.lon && dict.lat) {
      try {
        name = name ? name : '';
        setFocused(true);
        setFocusport({
          ...focusport,
          key: 'current-focused-item',
          longitude, latitude, name,
          details: {
            // title: 'Taiwan Porridge Kingdom',
            // address: '20956 Homestead Rd, Cupertino, CA 95014',
            // category: ['Taiwanese Food', 'Porridge', 'Cupertino'],
            // open_hour: '',
            // menu: 'https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg',
            // order: [{
            //   type: 'phone',
            //   notes: 'Pick up on your own(cash only). Make a phone call and order 30 mins before picking up.',
            //   action: '4082532569',
            // },{
            //   type: 'grubhub',
            //   notes: 'Deliver by grubhub.',
            //   action: 'https://www.grubhub.com/restaurant/taiwan-porridge-kingdom-20956-homestead-road-cupertino/1827642',
            // },{
            //   type: 'doordash',
            //   notes: 'Deliver by doordash.',
            //   action: 'https://www.doordash.com/store/taiwan-restaurant-san-jose-195/en-US',
            // }]
          }
        })
        setViewport({ ...viewport, longitude, latitude, transitionDuration: 400 })
      } catch (e) {
        console.error(e.message);
      }
    } else {
      // navigator.geolocation.getCurrentPosition(getLocation, console.error, { enableHighAccuracy: true })
    }
  }, [])
  let mapRef = React.useRef()
  let geocoderContainerRef = React.useRef()
  const { MAPBOX_API_KEY } = process.env;
  return (
    <div>
      <div className={`map-info-drawer-container search`} ref={geocoderContainerRef}/>
      <div className={`map-info-drawer-container ${focused} info`}>
        {focused && <div className='item-view-container'>
          <Item data={focusport} />
        </div>}
      </div>
      <div className='map-view-conatiner'>
        <MapGL
          ref={mapRef}
          mapboxApiAccessToken={MAPBOX_API_KEY}
          {...viewport}
          onViewportChange={setViewport}
          mapStyle={MAP_STYLE.MAPITOUT_LIGHT}
        >
          <Geocoder
            onLoading={onGeocoderLoading}
            inputValue={focusport.name}
            containerRef={geocoderContainerRef}
            mapRef={mapRef}
            onViewportChange={onGeocoderSelected}
            mapboxApiAccessToken={MAPBOX_API_KEY}
            position='top-left'
            enableEventLogging={false}
            limit={10}
            onResult={onInputChange}
            countries='us'
            placeholder='Search On The Map'
            // proximity={{ longitude: viewport.longitude, latitude: viewport.latitude }}
            // collapsed={true}
            trackProximity={true}
            bbox={[-124.409591, 32.534156, -114.131211, 42.009518]} // boundary of California
          />
          {focused && <Marker key={focusport.key}
            latitude={focusport.latitude}
            longitude={focusport.longitude}
          >
            {/* <img alt='pin' width='20px' src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Google_Maps_pin.svg/1200px-Google_Maps_pin.svg.png'/>*/}
            <div className='pin-001'>
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
            </div>
          </Marker>}
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
  );
};

export default Index;
