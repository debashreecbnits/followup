import React, { createContext } from 'react';
import PilgrimSdk from '@foursquare/pilgrim-sdk-react-native';
import styles from "./style";
import Geolocation from '@react-native-community/geolocation';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ImageBackground,
    StatusBar,
    Picker,
    Alert
  } from "react-native";
import MapView, { Animated, Marker, animateToRegion, Circle} from "react-native-maps";
import Api from '../../Api/Api';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from "react-native-elements";
import Config from '../../Api/config';

class SuggestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: null,
            latitude: 0,
            longitude: 0,
            markerArray:[],
            showActionsheet: false,
            status:''
        
        };
    }

    componentDidMount() {
        this.getCurrentLocation();
        this.props.navigation.addListener("focus", () => {
          this.setState({showActionsheet:false})
        });
    
        this.props.navigation.addListener("blur", () => {
          this.setState({showActionsheet:false})
        });
    }


    getCurrentLocation() {
      let data = {};
      Api.postAllApi('user/suggestion', data,
        this.props.data.token).then(suggestionListRes => {
        if (suggestionListRes.ack === true) {
          this.setState({
            markerArray: suggestionListRes.data
          })
        } 
    } )
     }


    markerClick = (userId, status) => {
    Api.getApi('user/' + userId, this.props.data.token).then(markerDetailsRes => {
      this.setState({ showActionsheet: true, requestDetails: markerDetailsRes.data[1] ? markerDetailsRes.data[1].requestSend[0] : '', selectedUserArray: markerDetailsRes.data[0].userDetails[0], userId: userId, status: status })
    })
  };

  goToProfile = (id) => {
    this.props.navigation.navigate('UserProfile',{"userId" : id})
  }

    render() {
      let initialRegion ={
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      }
        return(
            <View>
                 <View style={this.props.orientation == 'landscape'? styles.menuLandscape : styles.menuPotrait}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} >
                      <Icon name="menu" size={40} style={styles.hamburger} /> 
                    </TouchableOpacity>
                    <View style={{justifyContent:"flex-start",width: this.props.orientation == 'landscape'? '85%':'75%'}}>
                      <Text
                          style={{
                          color: "#339af0",
                          fontSize: 20,
                          fontWeight: "800",
                          marginHorizontal: 20,
                          
                          textAlign:'center'
                          }}
                      >
                          My Suggestions
                      </Text>
                    </View>
                </View>
                <View>
                  <MapView
                    showsUserLocation
                    style={{ width: "100%", height: "100%" }}                    
                  >
                    {
                    this.state.markerArray.map((marker, index) => {
                        let lat = marker.latitude;
                        let lang = marker.longitude;

                        return (

                          <MapView.Marker
                            key={index}
                            coordinate={{
                              latitude: marker.latitude ? Number(marker.latitude) : this.state.currentLatitude,
                              longitude: marker.longitude ? Number(marker.longitude) : this.state.currentLongitude,
                              latitudeDelta: 1,
                              longitudeDelta: 1
                            }}
                            
                            onPress={() => this.markerClick(marker.id, marker.category)}
                          >
                            <Image
                              source={marker.category == "Private" ? require("../../assets/images/redpin.png") :
                                marker.category == "Protected" ? require("../../assets/images/bluepin.png") :
                                  marker.category == "Public" ? require("../../assets/images/greenpin.png") : null
                              }
                              style={{ height: 30, width: 30 }}
                            />
                          </MapView.Marker>                             
                        )
                      })} 
                  </MapView>
                </View>
                {this.state.showActionsheet ? (
          <View style={[styles.container1, {
            shadowOffset: { width: 1, height: 1 },
            shadowColor: 'black',
            shadowOpacity: 0.1, position: 'absolute', bottom: '4%', zIndex: 10, paddingVertical: 10
          }]}>
            <View style={{marginBottom:"10%"}}>
              {this.state.status == "Private" ? (
                <View
                  style={[
                    styles.smallCardStyleAddress,
                    { paddingBottom: 100 }
                  ]}
                >
                  <TouchableOpacity
                  >
                    <Avatar
                      rounded
                      source={ this.state.selectedUserArray.profile_picture ? {uri : Config.profileImageUrl+this.state.selectedUserArray.profile_picture} : require("../../assets/images/profilepic.png")}
                      size={70}
                      containerStyle={{
                        borderWidth: 1,
                        borderColor: "#e0e5e1",
                        padding: 6
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ flexDirection: "column", justifyContent: 'center', marginLeft: 15 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold"
                      }}
                    >
                      {this.state.selectedUserArray.first_name} {this.state.selectedUserArray.last_name}
                    </Text>
                  </View>
                  <View style={{alignItems:'flex-end', width:'30%'}}>
                    <TouchableOpacity onPress={()=>this.setState({showActionsheet:false})}>
                      <Text style={{color: '#339af0', fontSize: 16,borderRadius:5, borderWidth:1, paddingHorizontal:10,paddingVertical:5, borderColor:'#339af0' }}>Close</Text>
                      </TouchableOpacity>
                 </View>
                </View>
              ) : (
                  <View
                    style={[
                      styles.smallCardStyleAddress,
                      { marginBottom: 50, }
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() =>
                       this.goToProfile(this.state.selectedUserArray._id)
                      }
                    >
                      <Avatar
                      
                        rounded
                        source={ this.state.selectedUserArray.profile_picture ? {uri : Config.profileImageUrl+this.state.selectedUserArray.profile_picture} : require("../../assets/images/profilepic.png")}
                        size={70}
                        containerStyle={{
                          borderWidth: 1,
                          borderColor: "#e0e5e1",
                          padding: 6,

                        }}
                      />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
                    <TouchableOpacity style={{ marginRight: 5, alignItems: 'flex-end' }} onPress={()=>this.setState({showActionsheet:false})} >
                      <Text style={{ color: '#339af0', fontSize: 16,borderRadius:5, borderWidth:1, paddingHorizontal:10,paddingVertical:5, borderColor:'#339af0' }}>Close</Text></TouchableOpacity>
                      <Text
                        style={{
                          paddingHorizontal: 15,
                          paddingTop: 20,
                          fontSize: 18,
                          fontWeight: "bold"
                        }}
                      >
                        {this.state.selectedUserArray.first_name} {this.state.selectedUserArray.last_name}
                      </Text>
                        <View style={{ flex: 1, flexDirection: "row", marginLeft: 10 }}>
                          <View style={{ marginTop: 5 }}>

                          <Image
                          source={require("../../assets/images/pin.png")}
                          style={{ height: 20, width: 20 }}
                          />
                          </View>
                        <View style={{marginBottom:15}}>
                        <Text
                          style={{
                            paddingHorizontal: 15,
                            paddingTop: 10,
                            fontSize: 16,
                            lineHeight: 20,                            
                          }}
                          
                        > 
                          {this.state.selectedUserArray.address}
                        </Text>
                        </View>

                        </View>
                      <TouchableOpacity
                      style={[styles.requestButtonStyle, {backgroundColor :  this.state.requestDetails  ? 'gray' : '#74B9FF'} ]}
                      activeOpacity={0.5}
                      disabled={this.state.requestDetails}
                      onPress={() => 
                      this.sendRequest(this.state.selectedUserArray)
                      }
                      
                    >                  
                      <Text style={styles.requestBtntext}>
                        {this.state.requestDetails.status =="S" ? 'Request Sent' : "Send Request" }
                      </Text> 
                     
                    </TouchableOpacity>

                   </View>
                  </View>
                )}
            </View>
          </View>
        ) : null}
            </View>
        )
    }
    

}
const mapStateToProps = state => {
    return {
      data: state.login.strogedetails,
      orientation:state.login.orientation
    }
  }
const mapDispatchToProps = dispatch => {
    return {
      getTokenToUserData: (data) => dispatch(storageToLogin(data)),

    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SuggestionScreen);