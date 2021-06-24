import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import Api from "../../Api/Api";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HTML from "react-native-render-html";

class TermsScreen extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      termsDetails: []
    };
  }

  componentDidMount() {    

    let data = {
      status: "terms"
    };
    Api.postAllApi("cms", data, this.props.data.token).then(sendRequestRes => {      
      this.setState({ termsDetails: sendRequestRes.cmsDetails[0] });
    });
  }

  render() {
    const { navigation } = this.props;
    const regex = /(<([^>]+)>)/gi;    
    const data = this.state.termsDetails.content;

    return (
      <View style={styles.container}>
        <View  style={this.props.orientation == 'landscape'? styles.menuLandscape : styles.menuPotrait}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={40} style={styles.hamburger} />
          </TouchableOpacity>
          <View style={{width:this.props.orientation == 'landscape'? '85%':'75%'}}>
          <Text
            style={{
              color: "#74B9FF",
            fontSize: 20,
            fontWeight: "800",
            marginLeft: 'auto',
            marginRight: 'auto'
            }}
          >
            Terms and Conditions
          </Text>

          </View>
          
        </View>
        <ScrollView>
          <View style={{ margin: 10 }}>
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

export default connect(mapStateToProps)(TermsScreen);
