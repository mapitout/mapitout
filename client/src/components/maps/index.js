import React from 'react'
import MapGL, { GeolocateControl, NavigationControl, Marker } from 'react-map-gl';
import MAP_STYLE from './map-styles'
import Geocoder from 'react-map-gl-geocoder';
import qs from 'qs';
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
    name: ''
  })

  let resizeId;
  window.addEventListener('resize', function (d) {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
  });
  function doneResizing() {
    setViewport({ ...viewport, width: '100%', height: '100%', transitionDuration: 100 })
  }
  function getLocation({ coords: { latitude, longitude } }) {
    console.log('Corrdinates updated')
    setViewport({ ...viewport, latitude, longitude })
  }
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
    updateURL(uri_params)
  }
  function updateURL(params) {
    if (window.history.replaceState) {
      window.history.replaceState({}, '', `/#/maps?${params}`);
    }
  }
  function onGeocoderLoading({query}){
    const uri_params = qs.stringify({
      q: query
    })
    updateURL(uri_params)
  }
  React.useEffect(()=>{
    const dict = qs.parse(window.location.href.split('?')[1])
    let longitude = Number(dict.lon)
    let latitude = Number(dict.lat)
    let name = dict.q
    if(name) setFocusport({ ...focusport, name });
    if(dict.lon&&dict.lat) {
      try{
        name=name?name:'';
        setFocused(true);
        setFocusport({
          ...focusport,
          key: 'current-focused-item',
          longitude, latitude, name
        })
        setViewport({ ...viewport, longitude, latitude, transitionDuration: 400 })
      }catch(e){
        console.error(e.message);
      }
    }else{
      navigator.geolocation.getCurrentPosition(getLocation, console.error, { enableHighAccuracy: true })
    }
  }, [])
  let mapRef = React.useRef()
  const { MAPBOX_API_KEY } = process.env;
  return (
    <div>
      <div className='map-view-conatiner'>
      <MapGL
        ref={mapRef}
        mapboxApiAccessToken={MAPBOX_API_KEY}
        {...viewport}
        onViewportChange={setViewport}
        mapStyle={MAP_STYLE.MAPITOUT_LIGHT}
      >
        <div className='item-view-container'>
          <Item />
        </div>
        <Geocoder
          onLoading={onGeocoderLoading}
          inputValue={focusport.name}
          mapRef={mapRef}
          onViewportChange={onGeocoderSelected}
          mapboxApiAccessToken={MAPBOX_API_KEY}
          position='top-left'
          enableEventLogging={false}
          limit={10}
          onResult={onInputChange}
          countries='us'
          placeholder='Search On The Map'
          proximity={{longitude: viewport.longitude, latitude: viewport.latitude}}
          // collapsed={true}
          trackProximity={true}
          bbox={[-124.409591, 32.534156, -114.131211, 42.009518]} // boundary of California
        />
        {focused && <Marker key={focusport.key}
          latitude={focusport.latitude}
          longitude={focusport.longitude}
        ><img alt='pin' width='20px' src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Google_Maps_pin.svg/1200px-Google_Maps_pin.svg.png'/>
        </Marker>}
        <GeolocateControl
          style={{
            position: 'absolute',
            top: 64,
            right: 0,
            margin: 10
          }}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showAccuracyCircle={true}
          showUserLocation={true}
          timeout={60000}
        />
        <div style={{
          position: 'absolute',
          top: 64 + 50,
          padding: 10,
          right: 0,
        }}>
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
