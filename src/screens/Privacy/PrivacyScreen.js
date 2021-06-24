import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView
  } from "react-native";
  import styles from './style';
  import { connect } from "react-redux";
  import Api from "../../Api/Api";
  import HTML from "react-native-render-html";

class PrivacyScreen extends React.Component {

    static navigationOptions = { header: null };
    constructor(props) {
      super(props);
      this.state = {
        termsDetails: []
      };
    }

    componentDidMount() {
    
        let data = {
          status: "privacy"
        };
        Api.postAllApi("cms", data, this.props.data.token).then(sendRequestRes => {;   
          this.setState({ termsDetails: sendRequestRes.cmsDetails[0] });
        });
      }

      render() {
        const { navigation } = this.props;
        const regex = /(<([^>]+)>)/gi;
        const data = this.state.termsDetails.content;
    
        return (
          <View style={styles.container}>
            <View style={styles.menu}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                  source={require("../../assets/images/hamberger-menu.png")}
                  style={styles.topArrowStyle}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "800",
                  marginHorizontal: 20
                }}
              >
                Privacy Policy
              </Text>
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
      data: state.login.strogedetails
    };
};

export default connect(mapStateToProps) (PrivacyScreen);