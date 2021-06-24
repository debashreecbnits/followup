import React, { Component } from "react";
import {View, Text, TouchableOpacity, Image, Dimensions, ScrollView, TextInput, 
        ActivityIndicator, Animated, Alert, KeyboardAvoidingView} from "react-native";
import styles from "./style";
import componenetStyle from "../../Components/styles";
import { connect } from "react-redux";
import Api from '../../Api/Api';
import HTML from "react-native-render-html";

class NewsFeedDetailScreen extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      newsfeedDetails: [],
      itemid: this.props.route.params ? this.props.route.params.itemid : '',
      showCommentBox:false,
      is_like:true,
      showLoading:false,
      comment:'',
      newsFeedLikeCount:'',
      newsFeedComment:[]
    };
  }

  componentDidMount() {
    this.newFeedDetails()
  }

  newFeedDetails = () =>{
    Api.getApi('newsFeed/' + this.state.itemid, this.props.data.token).then(newsFeedRes => {
      this.setState({
        newsfeedDetails: newsFeedRes.data[0],
        newsFeedLikeCount: newsFeedRes.newsFeedLikeCount,
        newsFeedComment: newsFeedRes.newsFeedComment,
        is_like: newsFeedRes.data[0].is_like
      });
    })
      .catch(err => { });
  }

  getImage(image) {
    if (image) {
      var newImage = "http://111.93.169.90:6061//NewsFeedImage/" + image;
      return <Image source={{ uri: newImage }} style={{ height: 300, width: undefined }} />;
    } else {
      return <Image source={require('../../assets/images/avatar.jpg')} style={{ height: 200, resizeMode: 'stretch', margin: 5 }} />;
    }
  }

  likeComment = (newsFeedId) => {
    this.setState({showLoading:true})
    let feedLikeData = { 
       newsFeedId:newsFeedId,
       userId:this.props.data.userId,
       is_like:!this.state.is_like
    }
    
    Api.postAllApi('newsFeed/like', feedLikeData, this.props.data.token).then(likeCommentRes => {
      if (likeCommentRes.ack == true) {
        this.setState({ showLoading: false, is_like:!this.state.is_like})
        this.newFeedDetails ();
        Alert.alert(likeCommentRes.message)
      } else {
        this.setState({ showLoading: false, is_Favourite: false })
        Alert.alert(likeCommentRes.message)
      }
    }).catch(this.setState({ showLoading: false }))
  }

  sendComment = (commentId) => {
    let commentData ={
      userId: this.props.data.userId,
      newsFeedId: commentId,
      comment: this.state.comment
    }
    Api.postAllApi('newsFeed/comment', commentData, this.props.data.token).then(sendCommenttRes => {
      if (sendCommenttRes.ack == true) {
        this.setState({ showLoading: false, comment:''});
        this.newFeedDetails ();
        Alert.alert(sendCommenttRes.message)
      } else {
        this.setState({ showLoading: false,  })
        Alert.alert(sendCommenttRes.message)
      }
    }).catch(this.setState({ showLoading: false }))
  }
  render() {
    const regex = /(<([^>]+)>)/ig;
    const { height, width } = Dimensions.get("window");
    const { navigation } = this.props;
    const { newsfeedDetails } = this.state
    const { state } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={this.props.orientation == 'landscape'?  styles.menuLandscape : styles.menuPotrait}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("NewsFeed")} >
            <Image
              source={require("../../assets/images/back-arw.png")}
              style={styles.topArrowStyle}
            />
          </TouchableOpacity>
          <View style={{width:this.props.orientation == 'landscape'? '85%':"78%"}}>
            <Text
              style={{
                color: "#74B9FF",
              fontSize: 20,
              fontWeight: "800",
              marginLeft: 'auto',
              marginRight: 'auto',
              }}
            >
              News Feed Detail
            </Text>
          </View>
        </View>
        <KeyboardAvoidingView
          style={{flex: 1, 
          }}
          behavior="padding"
        >
          <ScrollView>
          {this.state.showLoading ?
            <Animated.View style={styles.overScreenLoding}>
              <ActivityIndicator animating={true} size={50} color="#74B9FF" />
            </Animated.View> : null
          }
          <View style={[styles.card]}>
            <View style={styles.imageOuterContainer}>
              <Image
                 source={ newsfeedDetails.image ? {uri: newsfeedDetails.imageurl+newsfeedDetails.image} : require("../../assets/images/avatar.jpg")}
                style={[styles.image],{height: this.props.orientation == 'landscape'? 400 :200, width: this.props.orientation == 'landscape'? 700 :300}}
              />
            </View>
            <View style={styles.textHeaderOuter}>
              <Text style={[componenetStyle.textDarkBoldGreen, { fontSize: 18 }]}>
                {newsfeedDetails.title}
              </Text>
              <View style={styles.textHeaderInner}>
                <Image
                  source={require("../../assets/images/calender.png")}
                  style={{ height: 15, width: 15 }}
                />
                <Text style={styles.date}>{newsfeedDetails.date}</Text>
              </View>
            </View>

            <View style={styles.newsContent}>
              <HTML html={newsfeedDetails.details} />
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={()=>this.likeComment(newsfeedDetails.id)} style={{position:'relative'}}>
                  <Image
                    source={this.state.is_like ? require("../../assets/images/thumbs-up.png") : require("../../assets/images/thumbs-down.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <View style={styles.countView} >
                <Text style={{fontSize:10, color:'#fff'}}>{this.state.newsFeedLikeCount}</Text>
                </View>
                <TouchableOpacity onPress={()=> this.setState({showCommentBox:true})}>
                  <Image
                    source={require("../../assets/images/msg.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{paddingLeft:10}}>
              <Text style={{fontSize:18, fontWeight:'400'}}>Comments</Text>
              {this.state.newsFeedComment &&  this.state.newsFeedComment.map((res, index) => {
                return(
                <View style={styles.commentText}>
                  <Text >{res.comment}</Text>
                </View>
                )
              })}
              
              

            </View>
              {this.state.showCommentBox ? (
                <View style={{ flexDirection:'row', justifyContent:'space-between',
                shadowColor: 'rgba(51, 154, 240, 0.4)', shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8, }}>
                <View style={{
                  marginVertical: 10, borderWidth: 1, borderColor: 'transparent', width:'75%'
                  , paddingHorizontal: 20, backgroundColor: '#fff',borderRadius: 10,
                   borderColor: 'rgba(51,154,240,0.7)', paddingBottom: 10,
                }}>
                  
                  <TextInput
                    placeholder='Enter Comment'
                    multiline={true}
                    value={this.state.comment}
                    onChangeText={(text) => this.setState({ comment: text })}
                  />
                </View>
                <TouchableOpacity style={styles.sendComment} onPress={()=>this.sendComment (newsfeedDetails.id)}>
                  <Text style={{color:'#fff'}}>Send</Text>
                </TouchableOpacity>
                </View>
            ):
            null}
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
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

export default connect(mapStateToProps)(NewsFeedDetailScreen);