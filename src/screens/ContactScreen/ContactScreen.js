import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import Api from "../../Api/Api";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class ContactScreen extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      contactByEmail: "",
      contactByEmail_error: "",
      contactByPhone: "",
      contactByPhone_error: "",
      subject: "",
      subject_error: "",
      content: "",
      content_error: "",
      siteSettingEmail: ''
    };
  }

  componentDidMount() {
    this.getAdminEmail()
  }
  getAdminEmail() {
    Api.getApi("siteSetting", this.props.data.token).then(
      siteSettingRes => {
        this.setState({ siteSettingEmail: siteSettingRes.data[0].contact_email })
      }
    );
  }


  validate = (value, type) => {
    if (type === "contactByEmail") {
      this.setState({ contactByEmail: value });
      this.forceUpdate();
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regex.test(value)) {
        this.setState({ contactByEmail_error: "" });
      } else {
        this.setState({
          contactByEmail_error: "You should provide proper email address"
        });
      }
    }

    if (type === "contactByPhone") {
      this.setState({ contactByPhone: value });
      this.forceUpdate();
      var regex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

      if (regex.test(value)) {
        this.setState({ contactByPhone_error: "" });
      } else {
        this.setState({
          contactByPhone_error: "You should provide proper phone number"
        });
      }
    }

    if (type === "subject") {
      this.setState({ subject: value, subject_error: "" });
    }

    if (type === "content") {
      this.setState({ content: value, content_error: "" });
    }
  };

  handleSubmit = () => {

    if (this.state.contactByEmail == "") {
      this.setState({
        contactByEmail_error: "Please enter email"
      });
    } else if (this.state.contactByPhone == "") {
      this.setState({
        contactByPhone_error: "Please enter phone number"
      });
    } else if (this.state.subject == "") {
      this.setState({
        subject_error: "Please enter any subject"
      });
    } else if (this.state.content == "") {
      this.setState({
        content_error:
          "Please enter some comments"
      });
    } else {
      let data = {
        contactByEmail: this.state.contactByEmail,
        contactByPhone: this.state.contactByPhone,
        subject: this.state.subject,
        content: this.state.content,
        contactPersonEmail: this.state.siteSettingEmail
      };

      Api.postAllApi("contactus", data, this.props.data.token).then(
        sendRequestRes => {
          if (sendRequestRes.ack == false) {
            Alert.alert(sendRequestRes.details);
          } else if (sendRequestRes.ack == true) {
            this.setState({contactByEmail:"",
            contactByPhone:'',
            subject:'',
            content:''
          })
            Alert.alert(sendRequestRes.details);
            this.props.navigation.navigate("Home");
          }
        }
      );
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#25487f" />
        <View style={this.props.orientation == 'landscape'? styles.menuLandscape : styles.menuPotrait}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={40} style={styles.hamburger} />
          </TouchableOpacity>
          <View style={{ width: this.props.orientation == 'landscape'? '85%':"65%" }}>
            <Text
              style={{
                color: "#74B9FF",
                fontSize: 20,
                fontWeight: "800",
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              Contact Us
            </Text>
          </View>
        </View>
        <ScrollView >
          <KeyboardAvoidingView behavior="padding" enabled>
            <View style={[styles.inputContainer],{paddingHorizontal: this.props.orientation == 'landscape'? '4%':0}}>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.emailArea}
                  underlineColorAndroid="transparent"
                  placeholder="Enter email"
                  placeholderTextColor="grey"
                  value={this.state.contactByEmail}
                  onChangeText={contactByEmail =>
                    this.validate(contactByEmail, "contactByEmail")
                  }
                />
              </View>
              <Text style={styles.error}>{this.state.contactByEmail_error}</Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.emailArea}
                  underlineColorAndroid="transparent"
                  placeholder="Enter phone no"
                  placeholderTextColor="grey"
                  value={this.state.contactByPhone}
                  keyboardType={"numeric"}
                  onChangeText={contactByPhone =>
                    this.validate(contactByPhone, "contactByPhone")
                  }
                />
              </View>
              <Text style={styles.error}>{this.state.contactByPhone_error}</Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.emailArea}
                  underlineColorAndroid="transparent"
                  placeholder="Subject"
                  placeholderTextColor="grey"
                  value={this.state.subject}
                  onChangeText={subject => this.validate(subject, "subject")}
                />
              </View>
              <Text style={styles.error}>{this.state.subject_error}</Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Type your comments"
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}
                  value={this.state.content}
                  onChangeText={content => this.validate(content, "content")}
                />
              </View>
              <Text style={styles.error}>{this.state.content_error}</Text>
              <View
                style={{ width: "100%", paddingTop: 20, alignItems: "center" }}
              >
                <TouchableOpacity
                  style={styles.SubmitButtonStyle}
                  activeOpacity={0.5}
                  onPress={() => this.handleSubmit()}
                >
                  <Text style={styles.btntext}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
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

export default connect(mapStateToProps)(ContactScreen);