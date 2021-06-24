import React from 'react';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Animated, Alert } from 'react-native';
import { connect } from "react-redux";
import Api from '../../Api/Api';
import Config from '../../Api/config';
import UserProfile from './UserProfile';


class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteList: [],
      showLoading: false,
      viewProfile:false,

    }
  }

  componentDidMount() {
    this.getpotentialList();
  }

  getpotentialList() {
    this.setState({ showLoading: true })
    Api.getApi('follow/'+this.props.userId, this.props.data.token).then(potentialListRes => {
      if (potentialListRes.ack == true) {
        this.setState({ showLoading: false, favouriteList: potentialListRes.Followers })
      } else {
        this.setState({ showLoading: false, favouriteList: [] })
      }

    }).catch(err =>
      this.setState({ showLoading: false }),
    )
  }

  goToProfile = (id) => {
    this.setState({viewProfile:true, ViewProfileId:id})
  }

  render() {
    const { navigation } = this.props;
    
    return (
      <React.Fragment>
        {this.state.showLoading ?
          <Animated.View style={styles.overScreenLoding}>
            <ActivityIndicator animating={true} size={50} color="#74B9FF" />
          </Animated.View> : null
        }
         {this.state.viewProfile ? <UserProfile userId={this.state.ViewProfileId} navigation ={this.props.navigation}/> :
          <View>
            <View  style={this.props.orientation == 'landscape'? styles.menuLandscape : styles.menuPotrait}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                <Image
                    source={require("../../assets/images/back-arw.png")}
                    style={{margin: 15,
                      height: 20,
                      width: 20,
                      resizeMode: "stretch",
                      paddingTop: 10}}
                />
              </TouchableOpacity>
              <View style={{ width:this.props.orientation == 'landscape'? '88%':'78%', alignItems: 'center' }}>
                <Text style={{
                  color: "#74B9FF",
                  fontSize: 20,
                  fontWeight: "800",
                }}>Connections List
                </Text>
              </View>
            </View>
            <ScrollView style={{ width: '100%' , marginBottom:110}} showsVerticalScrollIndicator={false}>
            {this.state.favouriteList.length > 0 ? 
              this.state.favouriteList.map((res, index) => {
              return (
                <View style={styles.container}>

                  <View style={styles.card}>
                    <TouchableOpacity style={styles.profileImage} onPress={() =>
                      this.goToProfile(res.FollowUserId._id)
                    }>
                      <Image style={{ width: undefined, flex: 1 }} source={res.FollowUserId.profile_picture ? { uri: Config.profileImageUrl + res.FollowUserId.profile_picture } : require('../../assets/images/profilepic.png')} resizeMode="cover" />
                    </TouchableOpacity>

                    <View style={styles.userAction}>
                      <Text style={styles.userName}>{res.FollowUserId.first_name} {res.FollowUserId.last_name}</Text>
                      <View style={styles.workInfo}>
                        <Image source={require('../../assets/images/calender.png')} style={styles.calanderLogo} />
                        <Text style={styles.mutedBtn}>{res.FollowUserId.address}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )
            }):
            <View 
                style={{ alignSelf: 'center', paddingTop:20 }}
            >
                <Text style={{ fontSize: 18 }}>
                        No Result Found
                    </Text>
            </View>
        }
          {/* <View style={{ alignSelf: 'center' }}>{!this.state.favouriteList && <Text style={{ fontSize: 18 }}>No Result Found</Text>}</View> */}
          </ScrollView>
          </View>
          }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.login.strogedetails,
    orientation:state.login.orientation
  }
}

export default connect(mapStateToProps, null)(Connection);