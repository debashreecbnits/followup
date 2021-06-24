import React from "react";
import { AsyncStorage,Dimensions} from "react-native";
import MainMap from "./MainMap";
import Api from '../../Api/Api';
import { connect } from "react-redux";
import { storageToLogin, userLocator } from '../../store/actions/loginAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';

export class ParentMapScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: 22.5944516,
        longitude: 88.3835325,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      marker: [],
      markerArray: [],
      _unsubscribe: null,
      sortvalue: '',
      sortListArray: [],
      cuarray:[],
      currentLatitude:0,
      currentLongitude:0,
      orientation:''
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(res => {
        this.props.getTokenToUserData(JSON.parse(res))
      })
      .catch(err => console.log(err))
    setTimeout(() => {
      this.getCurrentLocation();    
    }, 2000)
    fetch('http://111.93.169.90:6061/app/category')
      .then(res => res.json())
      .then(data => this.setState({ sortListArray: data.categoryList }))
      .catch(err => console.log(err))
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition(
     (position) => {
       this.setState({
         currentLocation: position,
         currentLatitude: position.coords.latitude,
         currentLongitude: position.coords.longitude,
         error: null,
       }, () => this.getMarkerList())

     },
     (error) => this.setState({ error: error.message }),
     { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
   );
 }
  getOrientation = () => {
    if( Dimensions.get('window').width < Dimensions.get('window').height )
    {
      this.setState({ orientation: 'portrait' }, ()=>{
        this.props.getOrientationData('portrait')
      });
    }
    else
    {
      this.setState({ orientation: 'landscape' },()=>{
        this.props.getOrientationData('landscape')
      });
    }
  }

  getMarkerList() {
    let data = {
      latitude: this.state.currentLatitude,
      longitude: this.state.currentLongitude
    }
    Api.postAllApi('user', data, this.props.data.token).then(markerListRes => {
      if (markerListRes.ack === true) {
        this.setState({ marker: markerListRes.data })
        let markerArray = []
        let array = this.state.marker;
        for (let i = 0; i < array.length; i++) {
          markerArray.push(array[i]);
        }
        this.setState({
          markerArray: markerArray,
          cuarray: markerArray,
        });
      } else {
        this.setState({ marker: [] })
      }
    })
  }


  render() {
    return (
        <MainMap
          {...this.props}
          markerArray={this.state.cuarray}
          selectedUserId={(UserId) =>
          this.selectedUser(UserId)
          }
        />
      
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.login.strogedetails,
    mine: state.login.loc
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTokenToUserData: (data) => dispatch(storageToLogin(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentMapScreen);