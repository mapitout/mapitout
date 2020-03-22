import React from 'react'
import ReactMapGL, {GeolocateControl} from 'react-map-gl';

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
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function getLocation(pos) {
    const crd = pos.coords;
    setViewport({
      ...viewport,
      latitude: crd.latitude,
      longitude: crd.longitude,
    })
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function _onViewportChange(viewport) {
    setViewport({...viewport})
    console.log(viewport)
  }

  navigator.geolocation.getCurrentPosition(getLocation, error, options)
  return (
    <div className='map-view-conatiner'>
      <ReactMapGL
        mapboxApiAccessToken='pk.eyJ1IjoiYW1hemluZ2FuZHl5eSIsImEiOiJjamZqM25pZGYwamRvMnFvM3RsMTFyZDFzIn0.1YaQZ-Y0SXLmwfs0vQtO7w'
        {...viewport}
        onViewportChange={_onViewportChange}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      </ReactMapGL>
    </div>
  );
};

export default Index;
