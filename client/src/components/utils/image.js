import React from 'react';
import Img from 'react-image';
import {CircleLoader} from '../utils';

export function Image(props){
  return <Img {...props} src={props.src} loader={<CircleLoader />}
  />
}