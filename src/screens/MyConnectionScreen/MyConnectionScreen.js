import React from 'react';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  View, Text, Platform, Image, TouchableOpacity, ScrollView, ActivityIndicator, Animated, Alert, Linking, Button,
} from 'react-native';
import { connect } from "react-redux";
import Api from '../../Api/Api';
import { TouchableOpacityBase } from 'react-native';
import Config from '../../Api/config';
import { SearchBar } from 'react-native-elements';


class MyConnectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectList: [],
      filterConnectList: [],
      accpet: false,
      showLoading: false,
      showSearchBar: false,
      searchKeyword: "",
      optionDisplayIndex: 999999999,
      showMoreBtn:false
    }
  }

  componentDidMount() {
    this.getConnectionList()
    this.props.navigation.addListener("focus", () => {
      this.setState({showMoreBtn:false })
    });

    this.props.navigation.addListener("blur", () => {
      this.setState({showMoreBtn:false })
    });
  }

  getConnectionList() {
    this.setState({ showLoading: true })
    Api.getApi('request/connection', this.props.data.token).then(connectionListRes => {
      if (connectionListRes.ack === true) {
        this.setState({
          showLoading: false,
          connectList: connectionListRes.data,
          filterConnectList: connectionListRes.data,
        })
      } else {
        this.setState({ showLoading: false, connectList: [] })
      }

    }).catch(err =>
      this.setState({ showLoading: false }),
    )
  }

  messageBtnHandeler = (phone, userName) => {
    let SmsDivider = Platform.OS === "ios" ? "&" : "?";
    return Linking.openURL(`sms:${phone}${SmsDivider}body=${`Hi ${userName} i Would like to invite you`}`);
  }

  callBtnHandeler = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err))
  }

  filterConnectionList = (value) => {
    let data = {
      name: value
    }
    this.setState({ searchKeyword : value }, () => {
      Api.postAllApi('request/connection/filter', data, this.props.data.token).then(filterRes => {
        if (filterRes.ack==true){
          this.setState({
            filterConnectList: filterRes.data
          })
        }  
      }).catch(err => {
        console.log(err)
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showLoading ?
          <Animated.View style={styles.overScreenLoding}>
            <ActivityIndicator
              animating={true}
              size={50}
              color="#74B9FF"
            />
          </Animated.View> : null
        }
        <View style={this.props.orientation == 'landscape' ? styles.menuLandscape : styles.menuPotrait}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="menu" size={40} style={styles.hamburger} />
          </TouchableOpacity>
          <View style={{ width: this.props.orientation == 'landscape' ? '85%' : "80%" }}>
            <Text style={{
              color: "#74B9FF",
              fontSize: 20,
              fontWeight: "800",
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>Connection List</Text>
          </View>
          <Icon
            name="account-search-outline"
            size={40}
            style={styles.hamburger}
            onPress={() => this.setState({ showSearchBar: !this.state.showSearchBar, showMoreBtn:false })}
          />
        </View>
        {
          this.state.showSearchBar &&
          <SearchBar
            ref={search => this.search = search}
            platform="ios"
            placeholder="Search..."
            lightTheme
            round
            onCancel={() => {
              this.setState({
                filterConnectList: this.state.connectList,
                searchKeyword: "",
              })
            }}
            // onFocus={() => this.setState({ searchBox: true })}
            // onChange={() => this.setState({ searchBox: true })}
            onChangeText={(text) => this.filterConnectionList(text)}
            value={this.state.searchKeyword}
            containerStyle={{
              width: '92%',
              marginHorizontal: '4%',
              paddingHorizontal: 10,
              backgroundColor: 'transparent',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent'
            }}
            inputContainerStyle={{
              paddingHorizontal: 10,
              borderRadius: 30,
              backgroundColor: '#fff'
            }}
          />
        }
        <ScrollView style={{ flex: 1, paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
          {
            this.state.connectList.length > 0 ?

              this.state.filterConnectList.map((res, index) => {
                
                return (
                  // res.acepetUserId && res.acepetUserId ?
                  <View style={styles.container} key={index}>

                    <View style={styles.card}>
                      <TouchableOpacity
                        style={styles.morePng}
                        onPress={() => this.setState({
                          optionDisplayIndex: index,
                          showMoreBtn:!this.state.showMoreBtn
                        })}
                      >
                        <Image
                          style={{ height: 20, width: 20 }}
                          source={require('../../assets/images/more.png')}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                      { this.state.showMoreBtn &&
                        this.state.optionDisplayIndex === index &&
                        <View style={[styles.actionToggle, { zIndex: 1 }]}>
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.navigate('UserDistanceScreen',
                                { lat: res.acepetUserId.latitude, lng: res.acepetUserId.longitude })
                            }}>
                            <Icon
                              name="map-marker-radius"
                              color={'#fff'}
                              size={25}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              this.messageBtnHandeler(res.acepetUserId && res.acepetUserId.phone_number ?
                                res.acepetUserId.phone_number.phone_number
                                :
                                '1111111111',
                                res.acepetUserId.first_name)
                            }}>
                            <Icon
                              name="message"
                              color={'#fff'}
                              size={25} />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              this.callBtnHandeler( res.acepetUserId && res.acepetUserId.phone_number ?
                                res.acepetUserId.phone_number.phone_number
                                :
                                '1111111111',
                                res.acepetUserId.first_name)
                            }}
                          >
                            <Icon
                              name="phone"
                              color={'#fff'}
                              size={25}
                            />
                          </TouchableOpacity>
                        </View>
                      }
                      <TouchableOpacity
                        style={styles.profileImage}
                        onPress={() => {
                          this.props.navigation.navigate('UserProfile', { "userId": res.acepetUserId._id })
                        }}
                      >
                        <Image
                          style={{ width: undefined, flex: 1 }}
                          source={
                            res.acepetUserId && res.acepetUserId.profile_picture && res.acepetUserId.profile_picture ?
                              { uri: Config.profileImageUrl + res.acepetUserId.profile_picture}
                              :
                              require('../../assets/images/profilepic.png')
                          }
                          resizeMode="cover" />
                      </TouchableOpacity>

                      <View style={styles.userAction}>
                        <Text style={styles.userName}>
                          {res.acepetUserId && res.acepetUserId.first_name ? res.acepetUserId.first_name : ''} {res.acepetUserId && res.acepetUserId.last_name ? res.acepetUserId.last_name:''}
                        </Text>
                        <View style={styles.workInfo}>
                          <Image
                            source={require('../../assets/images/calender.png')}
                            style={styles.calanderLogo}
                          />
                          <Text style={styles.mutedBtn}>
                            {res.acepetUserId && res.acepetUserId.address ? res.acepetUserId.address : ''}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  // :null
                ) 
              })
              :
              <View
                style={{ alignSelf: 'center', paddingTop: 20 }}
              >
                <Text style={{ fontSize: 18 }}>
                  No Result Found
                            </Text>
              </View>

          }
        </ScrollView>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.login.strogedetails,
    orientation: state.login.orientation
  }
}

export default connect(mapStateToProps, null)(MyConnectionScreen);