import React from 'react';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Animated, Alert } from 'react-native';
import { connect } from "react-redux";
import Api from '../../Api/Api';
import Config from '../../Api/config'

class BlockListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockList: [],
      showLoading: false
    }
  }

  componentDidMount() {
    this.getBlockList();

  }

  getBlockList() {
    this.setState({ showLoading: true })
    Api.getApi('user/block/' + this.props.data.userId, this.props.data.token).then(blockListRes => {
      if (blockListRes.ack == true) {
        this.setState({ showLoading: false, blockList: blockListRes.data })
      } else {
        this.setState({ showLoading: false, blockList: [] })
      }

    }).catch(err =>
      this.setState({ showLoading: false }),
    )
  }

  unblockUser = (blockUserId) => {
    this.setState({ showLoading: true })
    let data = {
      sendUserId: this.props.data.userId,
      blockUserId: blockUserId,
      status: "UB"
    }

    Api.putApi('user/block', data, this.props.data.token).then(unblockRes => {
      if (unblockRes.ack == true) {
        this.setState({ showLoading: false, blockList: unblockRes.data })
        Alert.alert(unblockRes.details)

      } else {
        this.setState({ showLoading: false })
      }
    }).catch(err => console.log('err', err))
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showLoading ?
          <Animated.View style={styles.overScreenLoding}>
            <ActivityIndicator animating={true} size={50} color="#74B9FF" />
          </Animated.View> : null
        }
        <View style={this.props.orientation == 'landscape' ? styles.menuLandscape : styles.menuPotrait}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="menu" size={40} style={styles.hamburger} />
          </TouchableOpacity>
          <View style={{ width: this.props.orientation == 'landscape' ? '80%' : '70%', alignItems: 'center' }}>
            <Text style={{
              color: "#74B9FF",
              fontSize: 20,
              fontWeight: "800",
            }}>Block List
            </Text>
          </View>
        </View>
        <ScrollView style={{ width: '100%', paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          {this.state.blockList.length > 0 ?
            (this.state.blockList.map((res, index) => {
              return (
                <View style={styles.container}>
                  <View style={styles.card}>
                    <TouchableOpacity style={styles.morePng} onPress={() => this.unblockUser(res.blockUserId._id)}>
                      <Text style={{ color: '#fff' }}>Unblock</Text>
                    </TouchableOpacity>
                    <View style={styles.profileImage} >
                      <Image style={{ width: undefined, flex: 1 }} source={res.blockUserId.profile_picture ? { uri: Config.profileImageUrl + res.blockUserId.profile_picture } : require('../../assets/images/profilepic.png')} resizeMode="cover" />
                    </View>
                    <View style={styles.userAction}>
                      <Text style={styles.userName}>{res.blockUserId.first_name} {res.blockUserId.last_name}</Text>
                      <View style={styles.workInfo}>
                        <Image source={require('../../assets/images/calender.png')} style={styles.calanderLogo} />
                        <Text style={styles.mutedBtn}>{res.blockUserId.address}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )
            }))
            :
            (<View style={{ alignSelf: 'center', paddingTop: 20 }}>
              <Text style={{ fontSize: 18 }}>
                No Result Found
              </Text>
            </View>)
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

export default connect(mapStateToProps, null)(BlockListScreen);