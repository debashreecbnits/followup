import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  StatusBar,
  AsyncStorage,
  KeyboardAvoidingView,
  Alert, Dimensions
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import { CheckBox } from "react-native-elements";
import Spinner from 'react-native-loading-spinner-overlay';
import { login } from '../../store/actions/loginAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignInScreen = (props) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [email_error, setemail_error] = useState('');
  const [password_error, setpassword_error] = useState('');
  const [login_userid, setlogin_userid] = useState('');
  const [visible1, setvisible1] = useState(false);
  const [popupMsg, setpopupMsg] = useState('');
  const [spiner, setspiner] = useState(false);
  const [token, settoken] = useState({})
  const [checkbox, setcheckbox] = useState(false);
  const [orientation, setorientation] = useState ('')



  const signInHandeler = async () => {
    if (email === '' || password === '') {
      setemail_error("Please Enter Email Id")
      setpassword_error("Please enter password")
      return;
    } else {
      if (checkbox == false) {
        await AsyncStorage.removeItem("loginEmail");
        await AsyncStorage.removeItem("loginPassword");
      } else {
        await AsyncStorage.setItem("loginEmail", email);
        await AsyncStorage.setItem("loginPassword", password);
      }
      setspiner(true)
      const data = {
        "email": email,
        "password": password,
        "client_id": 'app.com'
      }
      props.onSignin(JSON.stringify(data))
      setemail('')
      setpassword('')
    }
  }

 const emailHandler = email => {
     setemail(email)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) {
      setemail_error("Enter valid email id")
    } else {
      setemail_error('')
    }
  };

  const checkboxHandler = async () => {
    if (checkbox == true) {
      setcheckbox(false);

    } else {
      setcheckbox(true);
    }
  };

  const passwordHandler = password => {
    setpassword(password)
      if (password.length < 5) {
        setpassword_error('Password must be atleast 6 character')
      } else {
        setpassword_error('')
      }
  };

 

  useEffect(() => {
   if(Object.entries(props.data).length === 0){
   } else{
      if(props.data.ack){
          AsyncStorage.setItem('token', JSON.stringify(props.data))
          .then(res => console.log(res))
          .catch(err => console.log(err))
          props.navigation.push('drawer')
      }
      else{
          if(props.data.details){
            Alert.alert(props.data.details)
              setspiner(false);
          }
          setspiner(false);
      }
      setspiner(false); 
   }

}, [props])

  const test = async() => {
    let token = await AsyncStorage.getItem("token");
    settoken(JSON.parse(token));
    let emailAsyncStorage = await AsyncStorage.getItem("loginEmail");
    let passwordAsyncStorage = await AsyncStorage.getItem("loginPassword");
    if (emailAsyncStorage) {
      setcheckbox(true);
      setemail(emailAsyncStorage);
      setpassword(passwordAsyncStorage)
    }
  }
  getOrientation = () =>
  {
    if( Dimensions.get('window').width < Dimensions.get('window').height )
    {
      setorientation('portrait')
    }
    else
    {
      setorientation('landscape')
    }
  }

  useEffect( () => {
    test();
    getOrientation()
  }, []);

    return (
      <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#25487f" />
      <KeyboardAvoidingView behavior="padding" style={{flex:1}}>

      <Spinner
        visible={spiner}
        textStyle={styles.spinnerTextStyle}
        />
        <View style={[styles.upperView],{height: orientation == 'landscape' ? '25%': '42%'}}>
          <View style={orientation == 'landscape' ?  styles.topLogoViewSignInLanscape : styles.topLogoViewSignInPotrait}>
            <Image
              source={require("../../assets/images/sign-up-logo.png")}
              style={orientation == 'landscape' ?  styles.TopLogoStyleLandscape : styles.TopLogoStylePotrait}
            />
          </View>
        </View>

        <ScrollView style={{backgroundColor:'#0b2031'}}>
          <View style={[styles.inputContainer], {paddingBottom: orientation == 'landscape' ? 300 :0, paddingHorizontal:'5%'}}>
            <View style={styles.inerLineStyle}>
              <Icon name="email"  style={{marginRight:10}} size={30} color="#339af0"/>
              <TextInput
                style={[styles.textInputStyle],{color:'#fff',width: orientation == 'landscape' ? '90%' : '80%'}}
                value={email}
                placeholder="ex : abcd@abc.com"
                autoCapitalize="none"
                placeholderTextColor='grey'
                onChangeText={ e => emailHandler(e) }
              />
              {
                email.length>0 &&
                  <Icon 
                    name="close" 
                    size={30} 
                    color="#339af0"
                    onPress={()=>{
                      setemail("")
                    }}
                  />
              }
            </View>
            <Text style={styles.error}>{email_error !='' && email_error}</Text>
            <View style={styles.inerLineStyle}>
            <Icon name="lock" size={30} style={{marginRight:10}} color="#339af0"/>
              <TextInput
                value={password}
                style={[styles.textInputStyle],{color:'#fff',width: orientation == 'landscape' ? '90%' : '80%'}} 
                placeholder="password" 
                secureTextEntry={true}
                placeholderTextColor='grey'
                onChangeText={ e => passwordHandler(e) } />
                {
                  password.length>0 &&
                    <Icon 
                      name="close" 
                      size={30} 
                      color="#339af0"
                      onPress={()=>{
                        setpassword("")
                      }}
                    />
                }
            </View>
            <Text style={styles.error}>{password_error !='' && password_error}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={ () => props.navigation.navigate('ForgotPassword')}>
                <Text
                  style={{ color: "#fff", fontSize: 13, fontWeight: "bold" }}
                >
                  Forgot password?{" "}
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
              <CheckBox 
                style={{ color: "red", }} 
                checked={checkbox} 
                onPress={checkboxHandler} 
              />
                    <Text
                      style={{
                        paddingTop: 19,
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: "bold",
                        right: 20
                      }}
                    >
                      Remember me
                </Text>
              </View>
            </View>
            <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity={0.5}
              onPress={ () => signInHandeler() }
            >
            <Text style={styles.btntext}>SIGN IN</Text>
            </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 30
              }}
            >
              <Text style={{ color: "#eaf7ff", opacity: 0.4, fontSize: 17 }}>
                Not a member{" "}
              </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('SignUpScreen')}>
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
                >
                  SIGN UP{" "}
                </Text>
              </TouchableOpacity>
              <Text style={{ color: "#eaf7ff",opacity: 0.4, fontSize: 17 }}>here</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </View>

    );
}

const mapStateToProps = state => {
  return{
    data: state.login.loginDetails,
    orientation:state.login.orientation
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onSignin: (cred) => dispatch(login(cred))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)