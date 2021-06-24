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
import AsyncStorage from "@react-native-community/async-storage";
import Api from "../../Api/Api"

export class OtpVerification extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = { otp: "", otp_error: "", email: "" };
  }

  async componentDidMount() {
    let email = await AsyncStorage.getItem("email");
    this.setState({ email: email });
  }

  otpHandle = value => {
    this.setState({ otp: value, otp_error: "" });
    this.forceUpdate();
  };

  handleSubmit = () => {
    if (this.state.email == "") {
      Alert.alert("Something went wrong. Please try again");
    } else if (this.state.otp == "") {
      this.setState({ otp_error: "Enter OTP" });
    } else if (this.state.otp.length != 6) {
      this.setState({ otp_error: "Enter valid OTP" });
    } else {
      let data = {
        email: this.state.email,
        otp: this.state.otp
      };
      let data1 = JSON.stringify(data);
      Api.postApi("user/checkOtp", data1).then(sendRequestRes => {
        if (sendRequestRes.ack == false) {
          Alert.alert(sendRequestRes.message);
        } else if (sendRequestRes.ack == true) {
          Alert.alert(sendRequestRes.message);
          this.props.navigation.navigate("ResetPassword");
        }
      });
    }
  };

  removeFeild = () => {
    this.setState({ otp: "" });
  };

  render() {
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
              <Text style={styles.topArrowText}>OTP VERIFICATION</Text>
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
                  ENTER OTP
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
                  source={require("../../assets/images/privacy.png")}
                  style={[styles.ImageStyleOtp, { left: 1 }]}
                />
                <TextInput
                  style={[styles.textInputStyle, { paddingLeft: 50 }]}
                  placeholder="Enter OTP"
                  keyboardType={"numeric"}
                  value={this.state.otp}
                  onChangeText={otp => this.otpHandle(otp)}
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

            <Text style={[styles.error, { paddingLeft: 60 }]}>
              {this.state.otp_error}
            </Text>

            <View style={{ width: "100%", paddingTop: 40 }}>
              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={0.5}
                onPress={() => this.handleSubmit()}
              >
                <Text style={styles.btntext}>VERIFY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default OtpVerification;
