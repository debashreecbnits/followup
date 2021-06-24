import React, {Component} from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  StatusBar,
  Picker,
  StyleSheet,
  Dimensions,KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { signup } from '../../store/actions/loginAction';
import styles from "./styles";
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog, {
  SlideAnimation,
  DialogButton,
  DialogContent,
  DialogFooter,
} from 'react-native-popup-dialog';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
class SignUpScreen extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = { 
        name: "",
        name_error:"",
        email: "",
        email_error: "",
        phone: "",
        phone_error: "",
        password: "",
        password_error: "",
        confirmPassword: "",
        confirmPassword_error: "",
        address: "",
        category: "",
        category_error: "",
        categoryList: [],
        status: "public",
        latitude: 0,
        longitude: 0,
        spinner: false,
        visible1: false,
        popupMsg: '',
        ack: '',
        message: '',
        orientation:''
    };
  }

 
  nameHandler = name => {
    this.setState({name: name});
    let reg = /^[a-zA-Z ]{2,30}$/;
    if (!reg.test(name)) {
      this.setState({
        name: name,
        name_error: 'Enter valid firstname',
      });
    } else {
      this.setState({
        name: name,
        name_error: '',
      });
    }
  };
  componentDidMount() {
    this.getOrientation1();  
    fetch('http://111.93.169.90:6061/app/category')
    .then(res => res.json())
    .then(data => {
      let newCatList = data.categoryList.map(element=>{
        return(
          {
            label: element.name, 
            value: element._id,
          }
        )
      })
      this.setState({categoryList: newCatList})
    })
    .catch(err => console.log(err))
    this.getCurrentLocation()
  }

  getOrientation1 = () =>
{
  if( Dimensions.get('window').width < Dimensions.get('window').height )
  {
    this.setState({orientation:'portrait'})
  }
  else
  {
    this.setState({orientation:'landscape'})
  }
}
  getCurrentLocation() {
    Geolocation.getCurrentPosition(
     (position) => {
       if(position) {
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=85cbdddddae04826a3a816f819a186fc`)
        .then(res => res.json())
        .then(data => this.setState({
          address: data.results[0].formatted,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }))
        .catch(err => console.log(err))
       }
     },
     (error) => this.setState({ error: error.message }),
     { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
   );
 }


  emailHandler = email => {
    this.setState({email: email});
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) {
      this.setState({
        email_error: 'Enter valid email id',
      });
    } else {
      this.setState({
        email_error: '',
      });
    }
  };


  phoneHandler = phone => {
    this.setState({phone: phone});
    let reg = /^\d{20}$/;
    this.setState({phone: phone});
    if (phone.length<10){
      this.setState({
        phone_error: 'Enter valid phone',
      });
    } else {
      this.setState({
        phone_error: '',
      });
    }
  };

  passwordHandler = password => {
    this.setState({password: password});
    if (this.state.password.length < 5) {
      this.setState({password_error: 'Password must be atleast 6 character'});
    } else {
      this.setState({password_error: ''});
    }
  };

  confirmPasswordHandler = confirmPassword => {
    if (this.state.password===this.state.confirmPassword) {
        this.setState({confirmpassword_error: ''});     
    } else {
        this.setState({confirmpassword_error: 'Confirm Password should match password'});
    }
  };

  setconfirmPasswordHandler = confirmPassword => {
    this.setState({confirmPassword: confirmPassword});
    if (this.state.confirmPassword.length < 5) {
      this.setState({confirmpassword_error: 'Confirm Password must be atleast 6 character'});
    } else {
      this.setState({confirmpassword_error: ''});     
    }
  };

  addressHandler = address => {
    this.setState({address: address});
  };

  statusHandler = status => {
    this.setState({status: status});
  };

  categoryHandler = category => {
    this.setState({category: category});
    this.forceUpdate();
    if (this.state.category!="") {
        this.setState({category_error: ''});
    } else {
        this.setState({category_error: 'Category field should not be blank'});
    }
  };

  closePopupbox = () => {
    this.setState({visible1: false});    
    if(this.state.ack==true){
      this.props.navigation.replace('SignInScreen');
    }
    else{
      this.props.navigation.replace('SignUpScreen');
    }   
  };

componentDidUpdate(prevProps) {
  if (prevProps !== this.props) {  
    this.setState({
      ack: this.props.data.ack,
      message: this.props.data.message,
      spinner: false
    });

    if(this.props.data.ack== "true"){
      this.setState({spinner: false});
      this.setState({visible1: true});
      this.setState({popupMsg: this.props.data.message})
      }
      else if(this.props.data.ack=="false"){
        this.setState({spinner: false});
        this.setState({visible1: true});
        this.setState({popupMsg: this.props.data.message});
      }else{
        this.setState({visible1: true});
        this.setState({popupMsg: this.props.data.message});
      }
    }
  }
  
handleSubmit = () => {
  if (this.state.name == '') {
    this.setState({
      name_error: 'Enter name',
    });
  }
  if (this.state.email == '') {
    this.setState({
      email_error: 'Enter email',
    });
  }
  if (this.state.phone == '') {
    this.setState({
      phone_error: 'Enter phone',
    });
  }
  if (this.state.password == '') {
    this.setState({
      password_error: 'Enter password',
    });
  } 
  if (this.state.confirmPassword == '') {
      this.setState({
          confirmPassword_error: 'Enter confirm password',
      });
    }
  if (this.state.address == '') {
    this.setState({
        address_error: 'Enter address',
    });
  }
  if (this.state.category == '') {
    this.setState({
        category_error: 'Select category',
    });
  }else {
    var fullName = this.state.name.split(' '),
    firstName = fullName[0],
    lastName = fullName[fullName.length - 1];
    const userDetails = {
      'first_name': firstName,
      'last_name': lastName,
      'phone_number': this.state.phone,
      'email': this.state.email,
      'password': this.state.password,
      'address': this.state.address,
      'category': this.state.category,
      'latitude': this.state.latitude,
      'longitude': this.state.longitude,
      'status': this.state.status,
    };
    this.setState({ spinner: true })
    this.props.onSignUp(JSON.stringify(userDetails));     
    }
  };


  render() {  

    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#25487f" />
        <KeyboardAvoidingView behavior="padding" enabled>
        <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
        />
        
        <ScrollView>
        <View style={[styles.upperView],{height: this.state.orientation == 'landscape' ? '40%': '25%'}}>
            <View style={[styles.topLogoViewSignUp], {height:'60%', marginLeft:'auto', paddingTop:'20%',marginRight:'auto'}}>
              <Image
                source={require("../../assets/images/sign-up-logo.png")}
                style={this.state.orientation == 'landscape' ?  styles.TopLogoStyleLandscape : styles.TopLogoStylePotrait}
              />
            </View>
        </View>
          <View style={[styles.inputContainer], {paddingBottom:300, paddingHorizontal:'5%'}}>
            <View style={styles.inerLineStyle}>
            <Icon name="account" size={30} color="#339af0"/>
              <TextInput
                style={[styles.textInputStyle],{color:'#fff', width: this.state.orientation == 'landscape' ? '90%' : '85%'}}
                placeholder="ex : John Doe"
                value={this.state.name}
                onChangeText={name => this.nameHandler(name)}
                placeholderTextColor= 'grey'
              />
              {
                this.state.name.length>0 &&
                <View >
                  <Icon 
                    name="close" 
                    size={30} 
                    color="#339af0"
                    onPress={()=>{
                      this.setState({
                        name:"",
                        name_error:'',
                      })
                    }}
                  />
                </View>
              }
            </View>
            <Text style={styles.error}>{this.state.name_error}</Text>
            <View style={styles.inerLineStyle}>
            <Icon name="email" size={30} color="#339af0"/>
              <TextInput
                 style={[styles.textInputStyle],{color:'#fff', width: this.state.orientation == 'landscape' ? '90%' : '85%'}}
                placeholder="ex : john@example.com"
                value = {this.state.email}
                onChangeText={email => this.emailHandler(email)}
                autoCapitalize="none"
                placeholderTextColor= 'grey'
              />
              {
                this.state.email.length>0 &&
                  <Icon 
                    name="close" 
                    size={30} 
                    color="#339af0"
                    onPress={()=>{
                      this.setState({
                        email:'',
                        email_error:'',
                      })
                    }}
                  />
              }
            </View>
            <Text style={styles.error}>{this.state.email_error}</Text>
            <View style={styles.inerLineStyle}>
            <Icon name="phone" size={30} color="#339af0"/>
              <TextInput
                 style={[styles.textInputStyle],{color:'#fff', width: this.state.orientation == 'landscape' ? '90%' : '85%'}}
                placeholder="ex : xxxxxxxxxxxx"
                keyboardType="number-pad"
                value={this.state.phone}
                placeholderTextColor= 'grey'
                onChangeText={email => this.phoneHandler(email)}
              />
              {
                this.state.phone.length>0 &&
                  <Icon 
                    name="close" 
                    size={30} 
                    color="#339af0"
                    onPress={()=>{
                      this.setState({
                        phone:'',
                        phone_error: "",
                      })
                    }}
                  />
              }
            </View>
            <Text style={styles.error}>{this.state.phone_error}</Text>
            <View style={styles.inerLineStyle}>
            <Icon name="lock" size={30} color="#339af0"/>
              <TextInput 
               style={[styles.textInputStyle],{color:'#fff', width: this.state.orientation == 'landscape' ? '90%' : '85%'}}
              placeholder="Password"
              value={this.state.password} 
              onChangeText={password => this.passwordHandler(password)}
              placeholderTextColor= 'grey'
              secureTextEntry={true}
              />
              {
                this.state.password.length>0 &&
                  <Icon 
                    name="close" 
                    size={30} 
                    color="#339af0"
                    onPress={()=>{
                      this.setState({
                        password:'',
                        password_error: "",
                      })
                    }}
                  />
              }
            </View>
            <Text style={styles.error}>{this.state.password_error}</Text>
            <View style={styles.inerLineStyle}>
            <Icon name="lock" size={30} color="#339af0"/>
              <TextInput
                 style={[styles.textInputStyle],{color:'#fff', width: this.state.orientation == 'landscape' ? '90%' : '85%'}}
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChangeText={confirmPassword => this.setconfirmPasswordHandler(confirmPassword)}
                onBlur={confirmPassword => this.confirmPasswordHandler(confirmPassword)}
                placeholderTextColor= 'grey'
                secureTextEntry={true}
              />
              {
                this.state.confirmPassword.length>0 &&
                  <Icon 
                    name="close" 
                    size={30} 
                    color="#339af0"
                    onPress={()=>{
                      this.setState({
                        confirmPassword:'',
                        confirmpassword_error: "",
                      })
                    }}
                  />
              }
            </View>
            <Text style={styles.error}>{this.state.confirmpassword_error}</Text>
            <View style={styles.inerLineStyle}>
            <Icon name="map-marker" size={30} color="#339af0"/>
              <TextInput 
               style={[styles.textInputStyle],{color:'#fff', width: this.state.orientation == 'landscape' ? '90%' : '85%'}}
              placeholder="Address" 
              value={this.state.address}
              onChangeText={address => this.addressHandler(address)}
              placeholderTextColor= 'grey'
              editable = {false}
              />
            </View>
            <Text style={styles.error}></Text>

            <View style={{width: '100%', position: "relative", backgroundColor:'transparent'}}>
            <Icon name="menu-swap-outline" style={{position: "absolute", top: '15%', right: '3%', zIndex: 9,}} size={30}  color="#339af0"/>
            <RNPickerSelect
              onValueChange={(value) => {
                this.setState({
                  category:value
                })
              }}
              style={pickerSelectStyles}
              items={this.state.categoryList}
            />
            </View>
            
            <Text style={styles.error}>{this.state.category_error}</Text>
          
            <View style={{ width: "100%", paddingTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={0.5}
                onPress={() => this.handleSubmit()}
              >
          <Text style={styles.btntext}>SIGN UP</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.c}>
                    <Dialog
                      visible={this.state.visible1}
                      dialogAnimation={
                        new SlideAnimation({
                          slideFrom: 'bottom',
                        })
                      }
                      onTouchOutside={() => {
                        this.closePopupbox()
                      }}
                      dialogStyle={{width: '80%'}}
                      footer={
                        <DialogFooter>
                          <DialogButton
                            textStyle={{
                              fontSize: 14,
                              color: '#333',
                              fontWeight: '700',
                            }}
                            text="OK"
                            onPress={() => {
                              this.closePopupbox()
                            }}
                          />
                        </DialogFooter>
                      }>
                      <DialogContent>
                        <Text style={styles.popupText}
                        >{this.state.popupMsg}
                        </Text>
                      </DialogContent>
                    </Dialog>
                  </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: 'center',
                paddingTop: 15,
                paddingLeft: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SignInScreen")}
              >
                <Text style={{ color: "#fff", fontSize: 16, paddingBottom: 15, fontWeight: 'bold'}}>SIGN IN </Text>
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
  console.log(state.login.userDetails)
  return{
    data: state.login.userDetails
  }
};

const mapDispatchToProps = dispatch => {
  return{
    onSignUp: (cred) => dispatch(signup(cred))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);



const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    fontSize:16,
    height: Dimensions.get("window").height * 6/100,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    marginBottom: 5,
    paddingHorizontal: 15,
    backgroundColor: 'transparent', 
    shadowColor: 'rgba(51, 154, 240, 0.4)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'grey',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});