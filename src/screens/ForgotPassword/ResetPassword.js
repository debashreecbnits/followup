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
import Api from "../../Api/Api";

export class ResetPassword extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      newPassword_error: "",
      confirmPassword: "",
      confirmPassword_error: "",
      email: ""
    };
  }

  async componentDidMount() {
    let email = await AsyncStorage.getItem("email");   
    this.setState({ email: email });
  }

  newPassword = newPassword => {
    this.setState({ newPassword: newPassword });
    if (this.state.newPassword.length < 5) {
      this.setState({
        newPassword_error: "Password must be atleast 6 character"
      });
    } else {
      this.setState({ newPassword_error: "" });
    }
  };

  confirmPassword = confirmPassword => {
    this.setState({
      confirmPassword: confirmPassword,
      confirmPassword_error: ""
    });
  };

  removeFeild = value => {    
    if (value == "password") {
      this.setState({ newPassword: "", newPassword_error: "" });
    } else if (value == "confirmPassword") {
      this.setState({ confirmPassword: "", confirmPassword_error: "" });
    }
  };

  handleSubmit = () => {
    if (this.state.email == "") {
      Alert.alert("Something went wrong. Please try again");
    } else if (this.state.newPassword == "") {
      this.setState({
        newPassword_error: "Enter new password"
      });
    } else if (this.state.confirmPassword == "") {
      this.setState({
        confirmPassword_error: "Re enter password"
      });
    } else if (this.state.newPassword != this.state.confirmPassword) {
      this.setState({
        confirmPassword_error:
          "Confirm password does not match with new password"
      });
    } else {
      let data = {
        email: this.state.email,
        password: this.state.newPassword
      };
      let data1 = JSON.stringify(data);      
      Api.postApi("user/updatePassword", data1).then(sendRequestRes => {
        if (sendRequestRes.ack == false) {
          Alert.alert(sendRequestRes.details);
        } else if (sendRequestRes.ack == true) {
          Alert.alert(sendRequestRes.details);
          this.props.navigation.navigate("SignInScreen");
        }
      });
    }
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
              <Text style={styles.topArrowText}>RESET PASSWORD</Text>
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
              <Image
                source={require("../../assets/images/password.png")}
                style={[styles.ImageStyle, { left: 15 }]}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="New Password"
                value={this.state.newPassword}
                onChangeText={newPassword => this.newPassword(newPassword)}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 15, bottom: 10 }}
                onPress={() => this.removeFeild("password")}
              >
                <Image
                  source={require("../../assets/images/txt-fld-cross.png")}
                  style={styles.ImageStyle1}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.error}>{this.state.newPassword_error}</Text>

            <View style={styles.inerLineStyle}>
              <Image
                source={require("../../assets/images/password.png")}
                style={[styles.ImageStyle, { left: 15 }]}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Confirm New Password"
                value={this.state.confirmPassword}
                onChangeText={confirmPassword =>
                  this.confirmPassword(confirmPassword)
                }
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 15, bottom: 10 }}
                onPress={() => this.removeFeild("confirmPassword")}
              >
                <Image
                  source={require("../../assets/images/txt-fld-cross.png")}
                  style={styles.ImageStyle1}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.error}>{this.state.confirmPassword_error}</Text>

            <View style={{ width: "100%", paddingTop: 30 }}>
              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={0.5}
                onPress={() => this.handleSubmit()}
              >
                <Text style={styles.btntext}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ResetPassword;
