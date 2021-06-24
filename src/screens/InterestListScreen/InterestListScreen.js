import React from 'react';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Animated, Alert } from 'react-native';
import { connect } from "react-redux";
import Api from '../../Api/Api';
import Config from '../../Api/config'

class InterestListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteList: [],
      showLoading: false
    }
  }

  componentDidMount() {
    this.getfavList()
  }

  getfavList() {
    this.setState({ showLoading: true })
    Api.getApi('favourite', this.props.data.token).then(favouriteListRes => {
      if (favouriteListRes.ack == true) {
        this.setState({ showLoading: false, favouriteList: favouriteListRes.data })
      } else {
        this.setState({ showLoading: false, favouriteList: [] })
      }
    }).catch(err =>
      this.setState({ showLoading: false }),
    )
  }

  removeFromFavourite = (FavouriteUserId) => {
    this.setState({ showLoading: true })
    let data = {
      FavouriteByUserId: this.props.data.userId,
      FavouriteUserId: FavouriteUserId,
      is_Favourite: false
    }

    Api.postAllApi('favourite', data, this.props.data.token).then(makeFavRes => {
      if (makeFavRes.ack == true) {
        this.setState({ showLoading: false })
        Alert.alert(makeFavRes.details)
        this.getfavList()
      } else {
        this.setState({ showLoading: false })
      }
    }).catch(err => console.log('err', err))
  }

  goToProfile = (id) => {
    this.props.navigation.navigate('UserProfile', { "userId": id })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showLoading ?
          <Animated.View style={styles.overScreenLoding}>
            <ActivityIndicator animating={true} size={50} color="#74B9FF" />
          </Animated.View> : null
        }
        <View  style={this.props.orientation == 'landscape'? styles.menuLandscape : styles.menuPotrait}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="menu" size={40} style={styles.hamburger} />
          </TouchableOpacity>
          <View style={{ width: this.props.orientation === 'portrait'? '70%':"85%", alignItems: 'center' }}>
            <Text style={{
              color: "#74B9FF",
              fontSize: 20,
              fontWeight: "800",
            }}>Favorites List
            </Text>
          </View>
        </View>
        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
          {this.state.favouriteList.length > 0 ? 
            this.state.favouriteList.map((res, index) => {
            return (
              <View style={styles.container}>
                <View style={styles.card}>
                  <TouchableOpacity style={styles.morePng} onPress={() => this.removeFromFavourite(res.FavouriteUserId._id)}>
                    <Image style={{ height: 20, width: 20 }} source={require('../../assets/images/heart.png')} resizeMode="cover" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.profileImage} onPress={() =>
                    this.goToProfile(res.FavouriteUserId._id)
                  }>
                    <Image style={{ width: undefined, flex: 1 }} source={res.FavouriteUserId.profile_picture ? { uri: Config.profileImageUrl + res.FavouriteUserId.profile_picture } : require('../../assets/images/profilepic.png')} resizeMode="cover" />
                  </TouchableOpacity>

                  <View style={styles.userAction}>
                    <Text style={styles.userName}>{res.FavouriteUserId.first_name} {res.FavouriteUserId.last_name}</Text>
                    <View style={styles.workInfo}>
                      <Image source={require('../../assets/images/calender.png')} style={styles.calanderLogo} />
                      <Text style={styles.mutedBtn}>{res.FavouriteUserId.address}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          }):
          <View 
            style={{ alignSelf: 'center' , paddingTop:20}}
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
    orientation:state.login.orientation
  }
}

export default connect(mapStateToProps, null)(InterestListScreen);