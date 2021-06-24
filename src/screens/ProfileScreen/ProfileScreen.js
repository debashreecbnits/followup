import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  //KeyboardAvoidingView,Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./style";
import { connect } from "react-redux";
import Api from '../../Api/Api';
import ImagePicker from 'react-native-image-crop-picker';
import config from '../../Api/config';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Config from '../../Api/config'
import { Dropdown } from "react-native-material-dropdown";
import { updateUserFunc } from '../../store/actions/loginAction';

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      phone_number: '',
      about: '',
      // gender: '',
      id: this.props.data.userId,
      address: '',
      profile_picture: [],
      userDetails: {},
      userImage: '',
      gender:'M',
      userinterestArray:[],
      value:'',
      interest:'',
      socialLink:'',
      linkType:'',
      showSocialUsername:false,
      socialMediaName:'',
      gender: 'M',
      genderIndex: 0, 
      radio_props: [
        { label: 'Male  ', value: "M" },
        { label: 'Female', value: "F" }
      ],

    }
  }

  componentDidMount() {
    this.getUserDetails();
    this.getInterestList();
  }

  getInterestList = () =>{
    Api.getApi('interest', this.props.data.token).then(userinterestRes => {      
      let testarray=[]
      this.setState({userinterestArray:userinterestRes.interestList}, ()=>{
        const value = this.state.userinterestArray[0]._id;
          this.setState({
          value
          });
      })
    }).catch(err => console.log(err))
  }

  submitDetails = (details) => {
    let formData = new FormData();
    formData.append('first_name', details.first_name);
    formData.append('last_name', details.last_name);
    formData.append('phone_number', details.phone_number);
    formData.append('about', details.about);
    formData.append('gender', details.gender);
    formData.append('id', details.id);
    formData.append('address', details.address);
    formData.append('profile_picture', details.profile_picture);
    formData.append('email', details.email);
    if (details.interest){
      formData.append('interest', details.interest);
    }
    
    if (details.socialLink)  {
      formData.append('link', details.socialLink)
      formData.append('linkType', details.linkType)
      formData.append('userName', details.socialMediaName)
    } 

    Api.putProfileUpdate('user', formData, this.props.data.token).then(editUserRes => {
      let updatedData=editUserRes.data[0].updateUser;
      this.props.getUpdatedUserDeatils(JSON.stringify(updatedData))
      Alert.alert('Profile Edited Successfully')
      this.getUserDetails()
      this.props.navigation.navigate('MyProfile', { "userId": this.props.data.userId })
    }).catch(err => console.log('err', err))
  }

  getUserDetails() {
    Api.getApi('user/' + this.props.data.userId, this.props.data.token).then(userDetailsRes => {
      this.setState({
        userDetails: userDetailsRes.data[0].userDetails[0],
        address: userDetailsRes.data[0].userDetails[0].address,
        email: userDetailsRes.data[0].userDetails[0].email ? userDetailsRes.data[0].userDetails[0].email.email : '',
        first_name: userDetailsRes.data[0].userDetails[0].first_name,
        last_name: userDetailsRes.data[0].userDetails[0].last_name,
        about: userDetailsRes.data[0].userDetails[0].about ? userDetailsRes.data[0].userDetails[0].about :'',
        phone_number: userDetailsRes.data[0].userDetails[0].phone_number ? userDetailsRes.data[0].userDetails[0].phone_number.phone_number : '',
        interestname: userDetailsRes.data[0].userDetails[0].interest ? userDetailsRes.data[0].userDetails[0].interest.value : '',
        interest: userDetailsRes.data[0].userDetails[0].interest ? userDetailsRes.data[0].userDetails[0].interest._id : '',
        gender: userDetailsRes.data[0].userDetails[0].gender,
        genderIndex: userDetailsRes.data[0].userDetails[0].gender=='M' ? 0 : 1
      
      }
      
      )
    })
  }

  selectProfilePicture = () => {
    Alert.alert(
      'Choose Image',
      '',
      [
        { text: 'Gallery', onPress: () => this.chooseGalleryImage() },
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Camera', onPress: () => this.chooseCameraImage() },
      ],
      { cancelable: false },
    );
  }

  chooseGalleryImage() {

    let images = []
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      const { path } = image
      images.push({ uri: path, type: 'image/jpg', name: 'image.jpg' });
      this.setState({ profile_picture: images[0], userImage: image.path, errImageText: '', errText: '' })

    });
  }

  chooseCameraImage() {
    let images = [];
    ImagePicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
    }).then(image => {
      const { path } = image
      images.push({ uri: path, type: 'image/jpg', name: 'image.jpg' });
      this.setState({ profile_picture: images[0], userImage: image.path, errImageText: '', errText: '' })
    });
  }

  selectGender = (value) => { //select gender
    this.setState({ gender: value })
  }

  handleChange = (value, index, data) => {
    const interestId = data[index]._id;
    this.setState({interest:interestId})
  };

  submitSocialLink = (value, index, data) =>{
    const sociallink = data[index].link;
    this.setState({socialLink:sociallink, showSocialUsername: true, linkType: value})
  }

  render() {
    const staticProfilePic = require("../../assets/images/profilepic.png");
    const socialArray =[
      {
        value: 'Facebook',
        link: 'https://www.facebook.com'
        
      },
      {
        value: 'Twitter',
        link:'https://twitter.com'
      },
      {
        value: 'Instagram',
        link:'https://www.instagram.com'
      }
    ]
    return (
      
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <View style={[styles.menu, {justifyContent: 'flex-start', 
        height:this.props.orientation == 'landscape'? 70:100,
        paddingTop:this.props.orientation == 'landscape'? 0:40}]}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require("../../assets/images/back-arw.png")}
              style={styles.topArrowStyle}
            />
          </TouchableOpacity>
          <View style={{width: this.props.orientation == 'landscape'? '87%':'79%'}}>
            <Text
              style={{
                color: "#74B9FF",
                fontSize: 20,
                fontWeight: "800",
                //marginHorizontal: 20,
                marginRight: 'auto',
                marginLeft: 'auto',
                textAlign: 'center',
              }}
            >
              Edit Profile
          </Text>
          </View>
        </View>
        <KeyboardAvoidingView
          style={{flex: 1, 
          }}
          behavior="padding"
        >
        <ScrollView >
          <View style={[styles.container,{paddingBottom: this.props.orientation == 'landscape'? 500 : 200, 
          width:this.props.orientation == 'landscape'?  '90%' : '92%',
          marginHorizontal:this.props.orientation == 'landscape'? '5%' :'4%'}]}>
            <View style={{ marginTop: 20, alignSelf: "center" }}>
              <View style={styles.profileImageBox} >
                <Image
                  source={{ uri: this.state.userDetails.profile_picture ? Config.profileImageUrl + this.state.userDetails.profile_picture : this.state.userImage }}
                  style={{ flex: 1, width: undefined }}
                  resizeMode="cover"
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 20,
                  backgroundColor: "#0A79DF",
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity onPress={() => this.selectProfilePicture()}>
                  <Image source={require("../../assets/images/pencil.png")} />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                marginHorizontal: 10,
                height: Dimensions.get("window").height
              }}
            >
              <View style={{
                marginVertical: 10, borderWidth: 1, borderColor: 'transparent', 
                borderRadius: 10, paddingHorizontal: 20, marginTop: 50, backgroundColor: '#fff', 
                shadowColor: 'rgba(51, 154, 240, 0.4)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8, borderColor: 'rgba(51,154,240,0.7)'
              }}>
                <Text style={{ opacity: 0.5, paddingTop: 10 }}>First Name</Text>
                <TextInput
                  value={this.state.first_name}
                  onChangeText={(text) => this.setState({ first_name: text })}
                  style={{ paddingVertical: 10,color:'#000' }}
                />
              </View>
              <View style={{
                marginVertical: 10, borderWidth: 1, borderColor: 'transparent'
                , borderRadius: 10, paddingHorizontal: 20, backgroundColor: '#fff', shadowColor: 'rgba(51, 154, 240, 0.4)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8, borderColor: 'rgba(51,154,240,0.7)'
              }}>
                <Text style={{ opacity: 0.5, paddingTop: 10 }}>Last Name</Text>
                <TextInput
                  value={this.state.last_name}
                  onChangeText={(text) => this.setState({ last_name: text })}
                  style={{ paddingVertical: 10, color:'#000'}}
                />
              </View>

              <View style={{
                marginVertical: 10, borderWidth: 1, borderColor: 'transparent'
                , borderRadius: 10, paddingHorizontal: 20, backgroundColor: '#fff', shadowColor: 'rgba(51, 154, 240, 0.4)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8, borderColor: 'rgba(51,154,240,0.7)', paddingBottom: 10
              }}>
                <Text style={{ opacity: 0.5, paddingTop: 10 }}>Bio</Text>
                <TextInput
                  multiline={true}
                  value={this.state.about}
                  onChangeText={(text) => this.setState({ about: text })}
                  style={{color:'#000' }}
                />
              </View>

              <View style={{
                marginVertical: 10, borderWidth: 1, borderColor: 'transparent'
                , borderRadius: 10, paddingHorizontal: 20, backgroundColor: '#fff', shadowColor: 'rgba(51, 154, 240, 0.4)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8, borderColor: 'rgba(51,154,240,0.7)', paddingBottom: 10
              }}>
                <Text style={{ opacity: 0.5, paddingTop: 10, marginBottom: 10 }}>Gender</Text>
                  <RadioForm formHorizontal={true} animation={true} >
                      {this.state.radio_props.map((obj, i) => {
                        var onPress = (value, index) => {
                          this.setState({
                            gender: value,
                            genderIndex: index
                          })
                        }
                        return (
                          <RadioButton labelHorizontal={true} key={i} >
                            <RadioButtonInput
                              obj={obj}
                              index={i}
                              isSelected={this.state.genderIndex === i}
                              onPress={onPress}
                              buttonInnerColor={'#2196f3'}
                              buttonOuterColor={this.state.genderIndex === i ? '#2196f3' : '#2196f3'}
                              buttonSize={15}
                              buttonStyle={{}}
                              buttonWrapStyle={{ marginLeft: 10 }}
                            />
                            <RadioButtonLabel
                              obj={obj}
                              index={i}
                              onPress={onPress}
                              labelStyle={{ color: '#000' }}
                              labelWrapStyle={{}}
                            />
                          </RadioButton>
                        )
                      })}
                    </RadioForm>
              </View>

              <View style={{
                marginVertical: 10, borderWidth: 1, borderColor: 'transparent'
                , borderRadius: 10, paddingHorizontal: 20, backgroundColor: '#fff',
                shadowColor: 'rgba(51, 154, 240, 0.4)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8, borderColor: 'rgba(51,154,240,0.7)',
              }}>                
                <Dropdown
                 label= 'Select Interest'
                  value={this.state.interestname}
                  pickerStyle={{borderBottomColor:'transparent',borderWidth: 0}}
                  style={{color: 'rgba(0,0,0,0.5)', }}
                  data={this.state.userinterestArray}
                  
                  onChangeText={this.handleChange}
                  inputContainerStyle={{borderBottomColor:'transparent'}}
                />              
                
              </View>

              <View style={{
                marginVertical: 10, borderWidth: 1, borderColor: 'transparent'
                , borderRadius: 10, paddingHorizontal: 20, backgroundColor: '#fff', shadowColor: 'rgba(51, 154, 240, 0.4)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8, borderColor: 'rgba(51,154,240,0.7)', 
              }}>                
                <Dropdown
                  label= 'Select Social Link'
                  value={this.state.linkType}
                  pickerStyle={{borderBottomColor:'transparent',borderWidth: 0}}
                  data={socialArray}
                  style={{color: 'rgba(0,0,0,0.5)', }}
                  onChangeText={this.submitSocialLink}
                  inputContainerStyle={{borderBottomColor:'transparent'}}
                />
            
               
              </View>
              {
                this.state.showSocialUsername ?(
                  <View style={{
                    marginVertical: 10, borderWidth: 1, borderColor: 'transparent'
                    , borderRadius: 10, paddingHorizontal: 20, backgroundColor: '#fff', shadowColor: 'rgba(51, 154, 240, 0.4)',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8, borderColor: 'rgba(51,154,240,0.7)', paddingBottom: 10
                  }}>
                    <Text style={{ opacity: 0.5, paddingTop: 10 }}>Social Media Username</Text>
                    <TextInput
                      multiline={true}
                      value={this.state.socialMediaName}
                      onChangeText={(text) => this.setState({ socialMediaName: text })}
                      style={{color:'#000' }}
                    />
                  </View>
                )
                :null
              }

              <View style={{
                marginVertical: 10, borderWidth: 1, borderColor: 'transparent'
                , borderRadius: 10, paddingHorizontal: 20, backgroundColor: '#fff', shadowColor: 'rgba(51, 154, 240, 0.4)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8, borderColor: 'rgba(51,154,240,0.7)'
              }}>
                <Text style={{ opacity: 0.5, paddingTop: 10 }}>Phone</Text>
                <TextInput
                  value={this.state.phone_number}
                  onChangeText={(text) => this.setState({ phone_number: text })}
                  style={{ paddingVertical: 10, color:'#000' }}
                />
              </View>

              <View style={{
                marginVertical: 10, borderWidth: 1, borderColor: 'transparent'
                , borderRadius: 10, paddingHorizontal: 20, backgroundColor: '#fff', shadowColor: 'rgba(51, 154, 240, 0.4)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8, borderColor: 'rgba(51,154,240,0.7)'
              }}>
                <Text style={{ opacity: 0.5, paddingTop: 10 }}>Email</Text>
                <Text
                  style={{ paddingVertical: 10, }}
                >
                  {this.state.email}
                </Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={[styles.requestButtonStyle, {
                    backgroundColor: '#0080FF', shadowColor: 'rgba(255, 255, 255, 1)',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                  }]}
                  activeOpacity={0.5}
                  onPress={() =>
                    this.submitDetails(this.state)
                  }
                >
                  <Text style={styles.requestBtntext}>
                    Submit
                </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
      
      

    )
  }
}

const mapStateToProps = state => {
  console.log(state.login.strogedetails, '111111')
  return {
    data: state.login.strogedetails,
    orientation:state.login.orientation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUpdatedUserDeatils: (data) => dispatch(updateUserFunc(data)),
    // getOrientationData : (data1) => dispatch (orientationData(data1))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
