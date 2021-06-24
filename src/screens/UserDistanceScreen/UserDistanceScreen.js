import React from "react";
import {Text, View,  TouchableOpacity, Image, Alert, BackHandler, AsyncStorage} from "react-native";

import { Avatar } from "react-native-elements";
import MapView, { Animated, Marker, animateToRegion, Circle} from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Api from '../../Api/Api';
import { connect } from "react-redux";
import MapViewDirections from 'react-native-maps-directions';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import PilgrimSdk from '@foursquare/pilgrim-sdk-react-native';

class UserDistanceScreen extends React.Component{

  constructor (props){
    super(props);
    this.state={
      currentLocation: '',
      currentLatitude: 0,
      currentLongitude : 0,
      mapZoomLableMin:0,
      mapZoomLableMax:20,
    }
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition(

     (position) => {      
       let region = {
         latitude: parseFloat(position.coords.latitude),
         longitude: parseFloat(position.coords.longitude),
         latitudeDelta: 0.01,
         longitudeDelta: 0.01
       };
       this.setState({
         currentLocation: position,
         currentLatitude: position.coords.latitude,
         currentLongitude: position.coords.longitude,
         initialRegion: region,
         error: null,
       })

     },
     (error) => this.setState({ error: error.message }),
     { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
   );
 }
  render() { 
            
      return(
        <>
        <TouchableOpacity  style= {{paddingTop:40, paddingLeft:10}} onPress={() => this.props.navigation.goBack()} >
            <Image
              source={require("../../assets/images/back-arw.png")}
              style={{
                margin: 15,
                height: 20,
                width: 20,
                resizeMode: "stretch",
                paddingTop: 10
              }}
            />
          </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
          
          <MapView
            showsUserLocation
            style={{ width: "100%", height: "100%" }}
            initialRegion={this.state.initialRegion}
            minZoomLevel={this.state.mapZoomLableMin}
            maxZoomLevel={this.state.mapZoomLableMax}
          >
          {
            this.state.currentLatitude !==0 &&
                <MapView.Marker
              
                coordinate={{
                latitude: this.state.currentLatitude,
                longitude: this.state.currentLongitude,
                latitudeDelta: 1,
                longitudeDelta: 1,
                }}
                pinColor='red'
              >
                {
                console.log("on marker", this.state.currentLatitude, this.state.currentLatitude)

                }
              <Image
                source={require("../../assets/images/redpin.png")
                  
                }
                style={{ height: 30, width: 30 }}
              />
            </MapView.Marker>
            }
          <MapView.Marker
            coordinate={{
            latitude: Number(this.props.route.params.lat),
            longitude: Number(this.props.route.params.lng),
            latitudeDelta: 1,
            longitudeDelta: 1,
            }}
            pinColor='green'
          >
            {
            console.log("on marker", this.state.currentLatitude, this.state.currentLongitude)

            }
          <Image
            source={require("../../assets/images/greenpin.png")
              
            }
            style={{ height: 30, width: 30 }}
          />
        </MapView.Marker>

        {
          this.state.currentLatitude !==0 &&
          <MapViewDirections
            origin={{latitude: Number(this.state.currentLatitude), longitude: Number(this.state.currentLongitude)}}
            destination={{latitude: Number(this.props.route.params.lat), longitude: Number(this.props.route.params.lng)}}
            apikey={'AIzaSyB1wSv9c_cy-vg9saA8H6UOSMV8Zqqeq1Y'}
            strokeWidth={3}
            strokeColor="hotpink"
            
          />
        }
       </MapView>
       
        </View>
        </>
      )
    }
}
 
export default UserDistanceScreen;