import React from 'react'
import MapGL, {
  GeolocateControl,
  NavigationControl
} from 'react-map-gl';
import MAP_STYLE from './map-styles'
import Geocoder from 'react-map-gl-geocoder';


const Index = () => {
  const [viewport, setViewport] = React.useState({
    width: '100%',
    height: '100%',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 14
  });

  var resizeId;
  window.addEventListener('resize', function (d) {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
  });
  function doneResizing() {
    setViewport({ ...viewport, width: '100%', height: '100%' })
  }
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocation, console.error, { enableHighAccuracy: true })
  }, [])
  function getLocation({ coords: { latitude, longitude } }) {
    console.log('Corrdinates updated')
    setViewport({ ...viewport, latitude, longitude })
  }
  function onGeocoderSelected(v) {
    setViewport({ ...viewport, ...v })
  }
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
        <Geocoder
          mapRef={mapRef}
          onResult={this.handleOnResult}
          onViewportChange={onGeocoderSelected}
          mapboxApiAccessToken={MAPBOX_API_KEY}
          position='top-left'
          enableEventLogging={false}
          limit={8}
          countries='us'
          placeholder='Search On The Map'
          proximity={{longitude: viewport.longitude, latitude: viewport.latitude}}
          collapsed={true}
          trackProximity={true}
          bbox={[-124.409591, 32.534156, -114.131211, 42.009518]}
        />
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
