import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert, KeyboardAvoidingView
} from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import Api from "../../Api/Api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class ChangePasswordScreen extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      oldPassword_error: "",
      newPassword: "",
      newPassword_error: "",
      confirmPassword: "",
      confirmPassword_error: ""
    };
  }

  oldPassword = oldPassword => {
    this.setState({ oldPassword: oldPassword });
    if (this.state.oldPassword.length < 5) {
      this.setState({ oldPassword_error: "Enter password correctly" });
    } else {
      this.setState({ oldPassword_error: "" });
    }
  };

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

  handleSubmit = () => {
    if (this.state.oldPassword == "") {
      this.setState({
        oldPassword_error: "Enter password"
      });
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
        oldPassword: this.state.oldPassword,
        confirmPassword: this.state.confirmPassword,
        newPassword: this.state.newPassword
      };
      Api.postAllApi("user/password", data, this.props.data.token).then(
        sendRequestRes => {
          this.setState({ termsDetails: sendRequestRes });
          if (sendRequestRes.ack == true) {
            Alert.alert(this.state.termsDetails.details);
            this.setState({
              oldPassword: "",
              oldPassword_error: "",
              newPassword: "",
              newPassword_error: "",
              confirmPassword: "",
              confirmPassword_error: ""
            })
            this.props.navigation.navigate("Home")
          } else {
            Alert.alert(this.state.termsDetails.details);
          }
        }
      );
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={this.props.orientation == 'landscape' ? styles.menuLandscape : styles.menuPotrait}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={40} color="#339af0" style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>
          <View style={{ width: this.props.orientation == 'landscape' ? '85%' : '75%' }}>
            <Text
              style={{
                color: "#74B9FF",
                fontSize: 20,
                fontWeight: "800",
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Change Password
            </Text>
          </View>
        </View>
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior="padding"
        >
          <ScrollView>
            <View style={styles.inputContainer}>
              <View style={styles.inerLineStyle}>
                <Image
                  source={require("../../assets/images/password.png")}
                  style={[styles.ImageStyle, { left: 15 }]}
                />
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Old Password"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  value={this.state.oldPassword}
                  onChangeText={oldPassword => this.oldPassword(oldPassword)}
                />
              </View>
              <Text style={styles.error}>{this.state.oldPassword_error}</Text>
              <View style={styles.inerLineStyle}>
                <Image
                  source={require("../../assets/images/password.png")}
                  style={[styles.ImageStyle, { left: 15 }]}
                />
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="New Password"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  value={this.state.newPassword}
                  onChangeText={newPassword => this.newPassword(newPassword)}
                />
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
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  value={this.state.confirmPassword}
                  onChangeText={confirmPassword =>
                    this.confirmPassword(confirmPassword)
                  }
                />
              </View>
              <Text style={styles.error}>{this.state.confirmPassword_error}</Text>
              <View
                style={{ width: "100%", alignItems: "center" }}
              >
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
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.login.strogedetails,
    orientation: state.login.orientation
  };
};

export default connect(mapStateToProps)(ChangePasswordScreen);