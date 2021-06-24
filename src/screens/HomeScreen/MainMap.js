import React from "react";
import { Text, View, TouchableOpacity, Image, StatusBar, Alert, BackHandler, AsyncStorage, ScrollView, Dimensions } from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-elements";
import MapView, { Animated, Marker, animateToRegion, Circle } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Api from '../../Api/Api';
import { connect } from "react-redux";
import Config from '../../Api/config';
import { SearchBar } from 'react-native-elements';
import { Dropdown } from "react-native-material-dropdown";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';

export class MainMap extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: 22.5944516,
        longitude: 88.3835325,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      },
      status: "",
      userId: "",
      loading: true,
      search: '',
      searchBox: true,
      selectedUserArray: {},
      currentLocation: '',
      currentLatitude: 0,
      currentLongitude: 0,
      userDetails: [],
      showActionsheet: false,
      requestDetails: '',
      markerArray: [],
      findUserArray: [],
      userinterestArray: [],
      value: '',
      interestId: '',
    };  
  }

  componentDidMount() {

    AsyncStorage.getItem('token')
      .then(res => {
        this.props.getTokenToUserData(JSON.parse(res))
      })
      .catch(err => console.log(err))
    setTimeout(() => {
      this.getCurrentLocation()
      this.getMarkerList();
      this.getInterestList();
    }, 2000)
    
    this.props.navigation.addListener("focus", () => {
      this.setState({showActionsheet:false})
    });

    this.props.navigation.addListener("blur", () => {
      this.setState({showActionsheet:false})
    });   
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
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
  reCenterMap = () => {
    const latitude = this.state.currentLatitude;
    const longitude = this.state.currentLongitude;
    const latitudeDelta = 0.001;
    const longitudeDelta = 0.001;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    })
  }
  getMarkerList() {
    let data = {
      latitude: this.state.currentLatitude,
      longitude: this.state.currentLongitude
    }
    Api.postAllApi('user', data, this.props.data.token).then(markerListRes => {
      if (markerListRes.ack === true) {
        this.setState({ marker: markerListRes.data, loading: false }, () => {
        })
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
  getInterestList = () => {
    Api.getApi('interest', this.props.data.token).then(userinterestRes => {      
      let testarray = []
      this.setState({ userinterestArray: userinterestRes.interestList }, () => {
        const value = this.state.userinterestArray[0]._id;
        this.setState({
          value
        });
      })
    }).catch(err => console.log(err))
  }


  markerClick = (userId, status) => {
    this.setState({ status: status })
    Api.getApi('user/' + userId, this.props.data.token).then(markerDetailsRes => {
      this.setState({
        showActionsheet: true, requestDetails: markerDetailsRes.data[1] ? markerDetailsRes.data[1].requestSend[0] : '',
        selectedUserArray: markerDetailsRes.data[0].userDetails[0], userId: userId, status: status
      })
    }).catch(err => {
      this.setState({ loading: false })
      console.log(err)
    })
  };


  goToProfile = (id) => {
    this.setState({showActionsheet:false})
    this.props.navigation.navigate('UserProfile', { userId: id })
  }

  sendRequest = (userdata) => {
    AsyncStorage.getItem('token')
      .then(res => {
        let user = JSON.parse(res);
        let data = {
          sendUserId: user.userId,
          acepetUserId: userdata._id,
          status: "S"
        }
        Api.postAllApi('request', data, this.props.data.token).then(sendRequestRes => {
          Alert.alert('Request sent successfully')
          this.setState({ showActionsheet: false })
        })
      }).catch(err => {
        this.setState({ loading: false })
        console.log(err)
      })

  }
  componentWillUnmount () {
    this.setState({showActionsheet:false})
  }

  onSortChangeHandeler = value => {
    if (value === "Private") {
      this.setState({ sortvalue: "5e53631adb0a2172087613e3" });
    }
    if (value === "Protected") {
      this.setState({ sortvalue: "5e536324db0a2172087613e4" });
    }
    if (value === "Public") {
      this.setState({ sortvalue: "5e53632edb0a2172087613e5" });
    }
    let data = {
      category: this.state.sortvalue
    }
    Api.postAllApi('user', data, this.props.data.token).then(markerListRes => {
      const latitude = this.state.currentLatitude;
      const longitude = this.state.currentLongitude;
      const latitudeDelta = 0.001;
      const longitudeDelta = 0.001;
      this.map.animateToRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
      })
      this.setState({ markerArray: markerListRes.data })
    }).catch(err => {
      this.setState({ loading: false })
      console.log(err)
    })
  };

  onDistanceChange = (value) => {
    this.setState({ loading: true })
    let data = {
      distance: value
    }
    Api.postAllApi('user', data, this.props.data.token).then(markerListRes => {      
      const latitude = this.state.currentLatitude;
      const longitude = this.state.currentLongitude;
      const latitudeDelta = 0.001;
      const longitudeDelta = 0.001;
      this.map.animateToRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
      })
      this.setState({ markerArray: markerListRes.data, loading: false })
    }).catch(err => {
      this.setState({ loading: false })
      console.log(err)
    })
  };

  locateUser = (data) => {
    let array = []
    array.push(data)
    this.setState({ markerArray: array }, () => {
      array = []
    })
  }

  selectedUser = (UserId) => {
    this.props.navigation.navigate('Profile', { userId: UserId });
  };

  updateSearch = (value) => {
    let data = {
      first_name: value
    }
    this.setState({ search: value }, () => {
      Api.postAllApi('user', data, this.props.data.token).then(markerListRes => {
        const latitude = this.state.currentLatitude;
        const longitude = this.state.currentLongitude;
        const latitudeDelta = 0.001;
        const longitudeDelta = 0.001;
        this.map.animateToRegion({
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        })
        this.setState({ markerArray: markerListRes.data, loading: false })
      }).catch(err => {
        this.setState({ loading: false })
        console.log(err)
      })
    })
  }

  selectInterest = (value, index, data) => {
    const interestId = data[index]._id;
    this.setState({ interestId: interestId })
    let interestdata = {
      interest: interestId
    }
    Api.postAllApi('user', interestdata, this.props.data.token).then(markerListRes => {      
      const latitude = this.state.currentLatitude;
      const longitude = this.state.currentLongitude;
      const latitudeDelta = 0.001;
      const longitudeDelta = 0.001;
      this.map.animateToRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
      })
      this.setState({ markerArray: markerListRes.data, loading: false })
    }).catch(err => console.log(err, 'error'))
  };

  render() {
    const { markerArray, userinterestArray } = this.state
    let data = [{ value: 'Private' }, { value: 'Protected' }, { value: 'Public' }];
    let distanceArray = [{ value: '500 ft' }, { value: '1 mile' }, { value: '3 miles' }];
    return (      
      <View style={{ position: 'relative' }}>
        <Spinner
          visible={this.state.loading}
          textStyle={styles.spinnerTextStyle}
        />
        <MapView
          ref={map => { this.map = map }}
          showsUserLocation
          style={{ width: "100%", height: "100%" }}
          initialRegion={this.state.initialRegion}
        >
          {
            markerArray && markerArray.map((marker, i) => {
              return (
                <MapView.Marker
                  key={i}
                  coordinate={{
                    latitude: marker.latitude ? Number(marker.latitude) : this.state.currentLatitude,
                    longitude: marker.longitude ? Number(marker.longitude) : this.state.currentLongitude,
                    latitudeDelta: 0.4,
                    longitudeDelta: 0.41
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
        {this.state.showActionsheet ? (
          <View style={[styles.container1, {
            shadowOffset: { width: 1, height: 1 },
            shadowColor: 'black',
            shadowOpacity: 0.1, position: 'absolute', bottom: '2%', zIndex: 10, paddingVertical: 10
          }]}>
            <View >
              {this.state.selectedUserArray.category && this.state.selectedUserArray.category.name == "Private" ? (
                <View
                  style={[
                    styles.smallCardStyleAddress,
                    { paddingBottom: 0 }
                  ]}
                >

                  <TouchableOpacity >
                    <Avatar
                      rounded
                      source={
                        this.state.selectedUserArray.profile_picture ?
                          { uri: Config.profileImageUrl + this.state.selectedUserArray.profile_picture }
                          :
                          require("../../assets/images/profilepic.png")}
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
                      }}
                    >
                      {this.state.selectedUserArray.first_name} {this.state.selectedUserArray.last_name}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => this.setState({ showActionsheet: false })}>
                      <Text style={{color: '#339af0', fontSize: 16,borderRadius:5, borderWidth:1, paddingHorizontal:10,paddingVertical:5, borderColor:'#339af0' }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                  <View
                    style={[
                      styles.smallCardStyleAddress,

                    ]}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.goToProfile(this.state.selectedUserArray._id)
                      }
                    >
                      <Avatar

                        rounded
                        source={
                          this.state.selectedUserArray.profile_picture ?
                            { uri: Config.profileImageUrl + this.state.selectedUserArray.profile_picture }
                            :
                            require("../../assets/images/profilepic.png")
                        }
                        size={70}
                        containerStyle={{
                          borderWidth: 1,
                          borderColor: "#e0e5e1",
                          padding: 6,

                        }}
                      />
                    </TouchableOpacity>

                    <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
                      <TouchableOpacity style={{ marginRight: 5, alignItems: 'flex-end' }} onPress={() => this.setState({ showActionsheet: false })} >
                        <Text style={{ color: '#339af0', fontSize: 16,borderRadius:5, borderWidth:1, paddingHorizontal:10,paddingVertical:5, borderColor:'#339af0' }}>Close</Text>
                      </TouchableOpacity>
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
                        <View style={{ marginBottom: 15, flex: 2 }}>
                          <Text
                            style={{
                              paddingHorizontal: 15,
                              paddingTop: 10,
                              fontSize: 16,
                              lineHeight: 20,                              
                            }}
                          >
                            {this.state.selectedUserArray.address ? this.state.selectedUserArray.address : ''}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.requestButtonStyle,
                          { backgroundColor: this.state.requestDetails ? 'gray' : '#74B9FF' }
                        ]}
                        activeOpacity={0.5}
                        disabled={this.state.requestDetails}
                        onPress={() =>
                          this.sendRequest(this.state.selectedUserArray)
                        }
                      >
                        <Text style={styles.requestBtntext}>
                          {this.state.requestDetails.status == "S" ? 'Request Sent' : "Send Request"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
            </View>
          </View>
        ) : null}
        <TouchableOpacity
          style={{ position: 'absolute', left: '6%', top: 30, }}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <Icon name="menu" size={40} color="#339af0" />
        </TouchableOpacity>
        <View style={[styles.SectionStyle,
        {
          width: '42%',
          position: 'absolute', top: 80,
          left: '4%', shadowOffset: { width: 1, height: 1 },
          shadowColor: 'black',
          shadowOpacity: 0.1,
        }]}>

          <View style={{ flex: 1, overflow: 'hidden', paddingLeft: 10, paddingBottom: 20, }}>
            <Dropdown
              value="Select Distance"
              dropdownPosition={0}
              data={distanceArray}
              onChangeText={e => this.onDistanceChange(e)}
              style={{ color: 'rgba(0,0,0,0.5)', fontSize: 14, borderColor: '#fff' }}
              baseColor="rgba(0,0,0,0.5)"
              containerStyle={{ width: '100%', }}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
            />
          </View>
        </View>

        <View style={[styles.SectionStyle,

        {
          width: '42%', position: 'absolute', top: 80, right: '4%', shadowOffset: { width: 1, height: 1 },
          shadowColor: 'black', shadowOpacity: 0.1,
        }]}>
          <View style={{ flex: 1, overflow: 'hidden', paddingBottom: 20, paddingLeft: 10 }}>
            <Dropdown
              value='Select Interest'
              dropdownPosition={0}
              pickerStyle={{ borderBottomColor: 'transparent', borderWidth: 0 }}
              data={userinterestArray}
              style={{ color: 'rgba(0,0,0,0.5)', fontSize: 14, borderColor: '#fff' }}
              baseColor="rgba(0,0,0,0.5)"
              containerStyle={{ borderColor: '#fff', width: '100%' }}
              onChangeText={this.selectInterest}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
            />
          </View>
        </View>

        <View style={[styles.SectionStyle,

        {
          width: '42%',
          position: 'absolute', top: 130,
          left: '4%', shadowOffset: { width: 1, height: 1 },
          shadowColor: 'black',
          shadowOpacity: 0.1,
        }]}>
          <View style={{ flex: 1, overflow: 'hidden', paddingBottom: 20, paddingLeft: 10 }}>
            <Dropdown
              value="Select Category"
              dropdownPosition={0}
              data={data}
              onChangeText={e => this.onSortChangeHandeler(e)}
              style={{ color: 'rgba(0,0,0,0.5)', fontSize: 14, borderColor: '#fff' }}
              baseColor="rgba(0,0,0,0.5)"
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              containerStyle={{ borderColor: '#fff', width: '100%' }}
            />
          </View>
        </View>
        <View style={[styles.SectionStyle,

        {
          width: '42%',
          position: 'absolute', top: 130,
          right: '4%', shadowOffset: { width: 1, height: 1 },
          shadowColor: 'black',
          shadowOpacity: 0.1, padding: 0
        }]}>
          <SearchBar
            ref={search => this.search = search}
            placeholder="Search..."
            lightTheme
            round
            onClear={() => this.setState({ search: '', searchBox: false })}
            onFocus={() => this.setState({ searchBox: true })}
            onChange={() => this.setState({ searchBox: true })}
            onChangeText={(e) => this.updateSearch(e, markerArray)}
            value={this.state.search}
            inputStyle={{ fontSize: 14 }}
            containerStyle={
              styles.mapContainer
            }
            inputContainerStyle={{
              border: 0,
              borderColor: 'red',
              backgroundColor: '#fff',
            }}
          />
        </View>
        <TouchableOpacity onPress={() => this.reCenterMap()} style={{ width: 50, height: 50, position: 'absolute', bottom: '4%', right: '4%', borderRadius: 50, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 20, height: 20 }} source={require("../../assets/images/locationGps.png")} />
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.login.strogedetails,
    orientation: state.login.orientation
  }
}
export default connect(mapStateToProps, null)(MainMap);