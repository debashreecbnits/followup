import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
} from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import Api from "../../Api/Api";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HTML from "react-native-render-html";


class AboutScreen extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      termsDetails: [],
      showLoading:false
    };
  }

  componentDidMount() {
    this.setState({showLoading:true})
    let data = {
      status: "aboutUs"
    };
    Api.postAllApi("cms", data, this.props.data.token).then(sendRequestRes => {
      this.setState({ termsDetails: sendRequestRes.cmsDetails[0], showLoading:false});
    });
  }

  render() {
    const { navigation } = this.props;
    const regex = /(<([^>]+)>)/gi;
    const data = this.state.termsDetails.content;

    return (
      <View style={styles.container}>
        
        <View style={this.props.orientation == 'landscape'? styles.menuLandscape : styles.menuPotrait }>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={40} style={styles.hamburger} />
          </TouchableOpacity>
          <View style={{width: this.props.orientation == 'landscape'?  '85%':"70%"}}>
            <Text
              style={{
                color: "#74B9FF",
              fontSize: 20,
              fontWeight: "800",
              marginLeft: 'auto',
              marginRight: 'auto'
              }}
            >
              About Us
            </Text>
          </View>
        </View>
        <ScrollView>
        {this.state.showLoading ?
          <Animated.View style={styles.overScreenLoding}>
            <ActivityIndicator animating={true} size={50} color="#74B9FF" />
          </Animated.View> : null
        }
          <View style={{ margin: 10, paddingHorizontal:this.props.orientation == 'landscape'? '3%':0}}>
            <HTML html={data} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.login.strogedetails,
    orientation:state.login.orientation
  };
};

export default connect(mapStateToProps)(AboutScreen);
