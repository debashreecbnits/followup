import React, { useReducer } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  ActivityIndicator, Animated, Alert, ImageBackground, Linking,AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./style";
import { connect } from "react-redux";
import Api from '../../Api/Api';
import Config from '../../Api/config'
import { concat } from "react-native-reanimated";
import Orientation from '../HomeScreen/Orientation';
import PotentialConnection from '../PotentialConnection/PotentialConnection';
import Connections from '../PotentialConnection/Connections';
import TopConnection from '../PotentialConnection/TopConnection';
import { storageToLogin, userLocator } from '../../store/actions/loginAction';


class MyProfileScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userDetails: '',
      showLoading: false,
      is_Favourite: false,
      is_Follow: false,
      noOfFollowers: '',
      noOfFollowing: '',
      noOfLike: '',
      connections:false,
      potentialConnections:false,
      topConnections:false,
      showFavIcon:'',
      userId: '',
      socialLinkArray:[]
    }
  }

  componentDidMount() {
    this.getUserDetails();
    let data = Orientation.getOrientation())
  }

  getUserDetails() {
    this.setState({ showLoading: true })
    Api.getApi('user/' + this.props.data.userId, this.props.data.token).then(userDetailsRes => {
      if (userDetailsRes.ack == true) {
        this.setState({
          userDetails: userDetailsRes.data[0].userDetails[0],
          showLoading: false, is_Favourite: userDetailsRes.data[0].isFavourite,
          noOfFollowers: userDetailsRes.followDetails.Followers,
          noOfFollowing: userDetailsRes.followDetails.Following,
          noOfLike: userDetailsRes.data[0].like,
          is_Follow: userDetailsRes.followDetails.isFollow,
          socialLinkArray: userDetailsRes.data[0].userDetails[0].socialLink && userDetailsRes.data[0].userDetails[0].socialLink ? userDetailsRes.data[0].userDetails[0].socialLink :[]
        })
      } else {
        this.setState({ showLoading: false })
      }

    }).catch(err => this.setState({ showLoading: false }))
  }
  render() {
    const { userDetails } = this.state;
    let linkType= userDetails.socialLink  ? userDetails.socialLink.linkType : ''
    let socialLink= userDetails.socialLink  ? userDetails.socialLink.link : ''
    const staticProfilePic = require("../../assets/images/profilepic.png");
    return (
      <>
      { this.state.connections ? <Connections navigation ={this.props.navigation} userId={this.props.data.userId}/> : 
      this.state.potentialConnections ? <PotentialConnection navigation ={this.props.navigation} userId={this.props.data.userId}/> :
      this.state.topConnections ? <TopConnection navigation ={this.props.navigation} userId={this.props.data.userId}/> :

      <View style={[styles.container], { position: 'relative' }}>
        
        {this.state.showLoading ?
          <Animated.View style={styles.overScreenLoding}>
            <ActivityIndicator animating={true} size={50} color="#74B9FF" />
          </Animated.View> : null
        }
        <TouchableOpacity
          style={{ backgroundColor: '#0b2031', paddingLeft: '3%', height:70, paddingTop:30 }}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Image
            source={require("../../assets/images/back-arw.png")}
            style={styles.topArrowStyle}
          />
        </TouchableOpacity>
        <ScrollView >
          <View style={styles.menu}>

          </View>


          <View style={styles.containerLower}>
            <View style={styles.profileImageBox}>
              <Image
                source={userDetails.profile_picture ? { uri: Config.profileImageUrl + userDetails.profile_picture } : staticProfilePic}
                style={{ width: 120, height: 120, borderRadius: 100, borderColor: "#d4d4d4", }}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                //paddingTop: 100,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: 'row'
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#26477c" }}
              >
                {userDetails.first_name} {userDetails.last_name}
              </Text>
              {/* {this.state.showFavIcon ?
                <TouchableOpacity onPress={() => this.makeFavourite(userDetails._id, this.state.is_Favourite)}>
                  <Image
                    source={this.state.is_Favourite ? require("../../assets/images/heart.png") : require("../../assets/images/heartOuter.png")}
                    style={{ width: 30, height: 30, borderRadius: 0, marginLeft: 10 }}
                    resizeMode="cover"
                  />
                </TouchableOpacity> : null} */}

            </View>
            <View
              style={{
                paddingTop: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 25,
                marginLeft: 15
              }}
            >
              <Image
                source={require("../../assets/images/location-map.png")}
                style={{ height: 20, width: 20 }}
              />
              <View style={{ flexDirection: 'row', flex: 2 }}>
                <Text style={{ fontSize: 15, color: "#26477c", paddingLeft: 10, textAlign: "left" }}>
                  {userDetails.address}
                </Text>
              </View>


            </View>

            {/* {this.state.showFavIcon ?
              <View style={styles.followContainer}>
                <TouchableOpacity style={styles.followBlockBtn} onPress={() => this.followUser(userDetails._id, this.state.is_Favourite)}>
                  {this.state.is_Follow ? <Text style={{ fontWeight: 'bold' }}>Following</Text> : <Text style={{ fontWeight: 'bold' }}>Follow</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.followBlockBtn} onPress={() => this.blockUser(userDetails._id, this.state.is_Favourite)}>
                  <Text style={{ fontWeight: 'bold' }}>Block</Text>
                </TouchableOpacity>
              </View>
              : null} */}

            <View style={{ width: '90%', backgroundColor: '#dfdfe5', height: 1.5, alignSelf: 'center' }}></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 20,
                paddingBottom: 20,
                paddingHorizontal: 10,
                paddingVertical: 35,
                backgroundColor: "#fff",
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20
              }}
            >

              <TouchableOpacity
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={()=>this.setState({connections:true})}
              >
                <Text style={{ fontWeight: "bold", color: "#0080ff" }}>{this.state.noOfFollowers}</Text>
                <Text style={{ fontWeight: "bold" }}>Connections</Text>
              </TouchableOpacity>
              <Text>|</Text>
              <TouchableOpacity
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={()=>this.setState({potentialConnections:true})}
              >
                <Text style={{ fontWeight: "bold", color: "#0080ff" }}>{this.state.noOfFollowing}</Text>
                <Text style={{ fontWeight: "bold", textAlign: 'center' }} >Potential {"\n"}Connections</Text>
              </TouchableOpacity>
              <Text>|</Text>
              <TouchableOpacity
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={()=>this.setState({topConnections:true})}
              >
                <Text style={{ fontWeight: "bold", color: "#0080ff" }}>{this.state.noOfLike}</Text>
                <Text style={{ fontWeight: "bold", textAlign: 'center' }}  >Top {"\n"} Connections </Text>
              </TouchableOpacity>
            </View>



          </View>
          <View style={{ backgroundColor: '#dfdfe5', paddingBottom: 300 }}>
            <View style={{ backgroundColor: '#fff', width: '100%', paddingHorizontal: '4%', alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
              <Text style={styles.firstBoxTitle}>Account Information</Text>
              <View style={styles.accountInfoContainer}>
                <Image
                  source={require("../../assets/images/profile.png")}
                  style={{ height: 20, width: 20 }}
                />
                <Text style={{ fontSize: 16, color: "#26477c", paddingLeft: 30 }}>
                  {userDetails.first_name ? userDetails.first_name : ''} {userDetails.last_name ? userDetails.last_name : ''}
                </Text>
              </View>
              <View style={styles.accountInfoContainer}>
                <Image
                  source={require("../../assets/images/about.png")}
                  style={{ height: 20, width: 20 }}
                />
                <Text style={{ fontSize: 16, color: "#26477c", paddingLeft: 30 }}>
                  {userDetails.about ? userDetails.about : ''}
                </Text>
              </View>
              <View style={styles.accountInfoContainer}>
                <Image
                  source={require("../../assets/images/gender.png")}
                  style={{ height: 20, width: 20 }}
                />
                <Text style={{ fontSize: 16, color: "#26477c", paddingLeft: 30 }}>
                  {userDetails.gender && userDetails.gender == "F" ? "Female" :
                    userDetails.gender == "M" ? "Male" : ''}
                </Text>
              </View>
              <View style={styles.accountInfoContainer}>
                <Image
                  source={require("../../assets/images/place.png")}
                  style={{ height: 20, width: 20 }}
                />
                <Text style={{ fontSize: 16, color: "#26477c", paddingLeft: 30, flex: 2 }}>
                  {userDetails.address}
                </Text>
              </View>
              <View style={styles.accountInfoContainer}>
                <Image
                  source={require("../../assets/images/terms.png")}
                  style={{ height: 20, width: 20 }}
                />
                <Text style={{ fontSize: 16, color: "#26477c", paddingLeft: 30 }}>
                  {userDetails.interest ? userDetails.interest.value : ''}
                </Text>
              </View>
            </View>



            <View style={{ backgroundColor: '#fff', width: '100%', paddingHorizontal: '4%', alignSelf: 'center', paddingBottom: 20, marginBottom: 20 }}>
              <Text style={styles.firstBoxTitle}>Social Link</Text>
              
              <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                {
                  this.state.socialLinkArray && this.state.socialLinkArray.map((data,index) => 
                  <TouchableOpacity onPress={()=> Linking.openURL(socialLink)}
                    style={{ marginHorizontal: 15, shadowOffset: { width: 1, height: 1, }, shadowColor: 'black', shadowOpacity: 0.4, }}>
                  <Image
                    source={
                      data.linkType == "Facebook"  ? require("../../assets/images/facebook.png") :
                      data.linkType == "Twitter" ? require("../../assets/images/twitter.png") :
                      data.linkType == "Instagram" ? require("../../assets/images/insta.png") : null
                  }
                    style={{ height: 50, width: 50 }}
                  />
                </TouchableOpacity>
                )}
                


                {/* <TouchableOpacity style={{ marginHorizontal: 15, shadowOffset: { width: 1, height: 1, }, shadowColor: 'black', shadowOpacity: 0.4, }}>
                  <Image
                    source={require("../../assets/images/twitter.png")}
                    style={{ height: 50, width: 50 }}
                  />
                </TouchableOpacity>


                <TouchableOpacity style={{ marginHorizontal: 15, shadowOffset: { width: 1, height: 1, }, shadowColor: 'black', shadowOpacity: 0.4, }}>
                  <Image
                    source={require("../../assets/images/linkedin.png")}
                    style={{ height: 50, width: 50 }}
                  />
                </TouchableOpacity> */}

              </View>

            </View>
          </View>
        </ScrollView>
      </View>
  }
  </>
    );
  }
};

const mapStateToProps = state => {
  return {
    data: state.login.strogedetails,
    orientation: state.login.orientation
  }
}

export default connect(mapStateToProps)(MyProfileScreen);