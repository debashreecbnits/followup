import React, { Component } from "react";
import {View, Text, TouchableOpacity, Image, ScrollView,ActivityIndicator, Animated,} from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import Api from '../../Api/Api';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dropdown } from "react-native-material-dropdown";

class NewsFeedScreen extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      newsfeedDetails: [],
      imageUrl: '',
      showLoading: false,
      userinterestArray: [],
      value: '',
    };
  }

  componentDidMount() {
    this.getInterestList();
    this.getNewsFeedList();
    this.setState({showLoading:true})
    
    
  }

  getNewsFeedList = () =>{
    let data = {}
    Api.postAllApi('newsFeed/list', data, this.props.data.token).then(newsFeedRes => {
      this.setState({
        newsfeedDetails: newsFeedRes.data,
        imageUrl: newsFeedRes.imageurl,
        showLoading:false
      });
    })
      .catch(err => { this.setState({showLoading:false})});
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
  selectInterest = (value, index, data) => {
    this.setState({ showLoading: true })
    const interestId = data[index]._id;
    this.setState({ interestId: interestId })
    let interestdata = {
      interest: interestId
    }
    Api.postAllApi('newsFeed/list', interestdata, this.props.data.token).then(res => {
      if (res.ack==true){
        this.setState({ showLoading: false })
      this.getNewsFeedList()
      }
    }).catch(err => {console.log(err, 'error')
    this.setState({ showLoading: false })
  })
  };

  onDistanceChange = (value) => {
    this.setState({ showLoading: true })
    let data = {
      distance: value
    }
    Api.postAllApi('newsFeed/list', data, this.props.data.token).then(res => {
      if (res.ack==true){
        this.setState({ showLoading: false })
        this.getNewsFeedList()
        }
    }).catch(err => {
      this.setState({ showLoading: false })
      console.log(err)
    })
  };
  onSortChangeHandeler = value => {
    this.setState({ showLoading: true })
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
    Api.postAllApi('newsFeed/list', data, this.props.data.token).then(res => {
      this.setState({ showLoading: false })
      this.getNewsFeedList()
    }).catch(err => {
      this.setState({ showLoading: false })
      console.log(err)
    })
  };
  render() {
    const {userinterestArray} = this.state
    const regex = /(<([^>]+)>)/ig;
    let distanceArray = [{ value: '500 ft' }, { value: '1 mile' }, { value: '3 miles' }];
    let data = [{ value: 'Private' }, { value: 'Protected' }, { value: 'Public' }];
    return (
      <View style={styles.container}>
        {this.state.showLoading ?
          <Animated.View style={styles.overScreenLoding}>
              <ActivityIndicator animating={true} size={50} color="#74B9FF" />
          </Animated.View> :null 
        } 
        <View style={this.props.orientation == 'landscape'?  styles.menuLandscape : styles.menuPotrait}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
             <Icon name="menu" size={40} style={styles.hamburger} />
          </TouchableOpacity>
          <View style={{width:this.props.orientation == 'landscape'? '85%':"70%"}}>
            <Text
              style={{
                color: "#74B9FF",
              fontSize: 20,
              fontWeight: "800",
              marginLeft: 'auto',
              marginRight: 'auto',
              }}
            >
              News Feed
            </Text>
          </View>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreatePost')}><Icon name="pencil-box" size={40} color="#74B9FF"/></TouchableOpacity>
          
        </View>

        <View>
            <Dropdown
              value='Select Interest'
              dropdownPosition={0}
              pickerStyle={{ borderBottomColor: 'transparent', borderWidth: 0 }}
              data={userinterestArray}
              style={{ color: 'rgba(0,0,0,0.5)', fontSize: 14, borderColor: '#fff' }}
              baseColor="rgba(0,0,0,0.5)"
              containerStyle={{ width: '85%',marginHorizontal:'7%' }}
              onChangeText={this.selectInterest}
            />
        </View>
        <View>
          <Dropdown
            value="Select Distance"
            dropdownPosition={0}
            data={distanceArray}
            onChangeText={e => this.onDistanceChange(e)}
            style={{ color: 'rgba(0,0,0,0.5)', fontSize: 14, borderColor: '#fff' }}
            baseColor="rgba(0,0,0,0.5)"
            containerStyle={{ width: '85%',marginHorizontal:'7%' }}
          />
        </View>

        <ScrollView>
              
          {this.state.newsfeedDetails.map((item, index) =>
            <TouchableOpacity
              onPress={() => this.props.navigation.replace('NewsFeedDetailScreen', { itemid: item.id })}
              key={index}
            >
              <View style={[styles.card],{paddingHorizontal:'7%', paddingBottom: 30}}>
                <View style={styles.imageOuterContainer}>
                  <Image
                    source={item.image ? { uri: this.state.imageUrl + item.image } : require("../../assets/images/avatar.jpg")}
                    style={[styles.image, { width: '105%', height:this.props.orientation == 'landscape'? 400:200}]}
                    resizeMode="cover"
                  />
                </View>

                <View style={{
                  backgroundColor: '#fff', 
                  paddingBottom: 10, 
                  paddingTop:0, 
                  marginTop:0, 
                  borderRadius: 10,
                  borderTopRightRadius:0,
                  borderTopLeftRadius:0, 
                  shadowOffset: { width: 0, height: 0, },
                  shadowColor: 'rgba(0,0,0,0.1)',
                  shadowOpacity: 1.0,
                }}>
                  <View style={styles.textHeaderOuter}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>{item.title}</Text>
                    <View style={styles.textHeaderInner}>

                      {item.image ?

                        <Image source={{ uri: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png' }}
                          style={{ width: 12, height: 15 }}
                        />
                        :
                        <Image
                          source={require("../../assets/images/calender.png")}
                          style={{ height: 12, width: 15 }}
                        />
                      }

                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                  </View>

                  <View style={styles.newsContent}>
                    <Text>
                      {item.details.replace(regex, '')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

          )}

        </ScrollView>
      </View>
    );

  }
}

const mapStateToProps = state => {
  return {
    data: state.login.strogedetails,
    orientation:state.login.orientation
  }
}

export default connect(mapStateToProps)(NewsFeedScreen);