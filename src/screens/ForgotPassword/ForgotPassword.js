import React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  StatusBar,
  Alert
} from "react-native";
import styles from "./styles";
import AsyncStorage from '@react-native-community/async-storage';
import Api from "../../Api/Api";

export class ForgotPassword extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = { email: "", email_error: "" };
  }


  emailHandle = (value) => {
    this.setState({ email: value });
    this.forceUpdate();
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(value)) {
      this.setState({ email_error: "" });
    } else {
      this.setState({
        email_error: "You should provide proper email address"
      });
    }
  };

  handleSubmit = () => {
    if(this.state.email == ''){
      this.setState({email_error: 'Enter email'})
    }
    else{
      AsyncStorage.setItem("email", this.state.email)
      let data = {
        email: this.state.email,
      };
      let data1 = JSON.stringify(data);      
      Api.postApi("user/forgotPassword", data1).then(
        sendRequestRes => {
          if (sendRequestRes.ack == false) {
            Alert.alert(sendRequestRes.message);
          } else if (sendRequestRes.ack == true) {
            Alert.alert(sendRequestRes.details);
            this.props.navigation.navigate("OtpVerification");
          }
        }
      );
    }
  }

  removeFeild = () => {
    this.setState({email: ''})
  }

  render() {
    
    const { navigation } = this.props;
    const { location } = this.state;
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#25487f" />
        <View style={styles.upperView}>
          <ImageBackground
            source={require("../../assets/images/sign-up-curve.png")}
            style={styles.topImageStyle}
          >
            <View style={styles.topArrowView}>
              <TouchableOpacity onPress={() => goBack()}>
                <Image
                  source={require("../../assets/images/back-arw.png")}
                  style={styles.topArrowStyle}
                />
              </TouchableOpacity>
              <Text style={styles.topArrowText}>FORGOT PASSWORD</Text>
            </View>
            <View style={styles.topLogoViewSignUp}>
              <Image
                source={require("../../assets/images/sign-up-logo.png")}
                style={styles.TopLogoStyle}
              />
            </View>
          </ImageBackground>
        </View>
        <ScrollView>
          <View style={styles.inputContainer}>
            <View style={styles.inerLineStyle}>
              <View style={{ width: "100%" }}>
                <Text
                  style={{
                    left: 25,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#26477c"
                  }}
                >
                  ENTER EMAIL ADDRESS
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 10
                }}
              >
                <Image
                  source={require("../../assets/images/email.png")}
                  style={[styles.ImageStyle, { left: 1 }]}
                />
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="ex : abcd@abc.com"
                  value={this.state.email}
                  onChangeText={email => this.emailHandle(email)}
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 1, bottom: 10 }}
                  onPress={this.removeFeild}
                >
                  <Image
                    source={require("../../assets/images/txt-fld-cross.png")}
                    style={styles.ImageStyle1}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[styles.error,{paddingLeft: 60}]}>{this.state.email_error}</Text>

            <View style={{ width: "100%", paddingTop: 40 }}>
              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={0.5}
                onPress={() => this.handleSubmit()}
              >
                <Text style={styles.btntext}>GET OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ForgotPassword;
