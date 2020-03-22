import React from 'react'
import MapGL, { 
  GeolocateControl,
  ScaleControl
} from 'react-map-gl';
import MAP_STYLE from './map-styles'

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
};

const Index = () => {
  const [viewport, setViewport] = React.useState({
    width: '100%',
    height: '100%',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 14
  });

  function getLocation(pos) {
    setViewport({
      ...viewport,
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    })
  }

  function _onViewportChange(viewport) {
    setViewport({...viewport})
    // console.log(viewport)
  }

  navigator.geolocation.getCurrentPosition(getLocation, (e)=>console.error(e.message), { enableHighAccuracy: true })
  return (
    <div className='map-view-conatiner'>
      <MapGL
        mapboxApiAccessToken={process.env.MAPBOX_API_KEY}
        {...viewport}
        onViewportChange={_onViewportChange}
        mapStyle={MAP_STYLE.MAPITOUT_LIGHT}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
        {/* <NavigationControl /> */}
        <ScaleControl />
      </MapGL>
    </div>
  );
};

export default Index;
