import React from 'react';
import {Dimensions} from 'react-native'

class Orientation {
  static getOrientation = () =>
  // Dimensions.addEventListener( 'change', () =>
  // {
  
    {
      if( Dimensions.get('window').width < Dimensions.get('window').height )
      {
        let data = 'portrait';
        return data;
      }
      else
      {
        let data = 'landscape';
        return data
      }
    }
  // });
}
export default Orientation