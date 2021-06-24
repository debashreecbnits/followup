
import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default {
  mainContainer: {
    flex: 1,
    position: 'relative'
  },
  upperView: {
    height: "42%"
  },

  topImageStyle: {
    height: "100%",
    width: "100%"
  },

  topLogoViewSignIn: {
    alignItems: "center",
    height: "80%",
    justifyContent: "center",
    paddingTop: 30
  },
  fontclass : {
    fontSize:14
  },

  topLogoViewSignUp: {
    alignItems: "center",
    height: "80%",
    justifyContent: "center",
    paddingBottom: 60
  },

  TopLogoStyle: {
    padding: 10,
    margin: 5,
    height: 140,
    width: 120,
    resizeMode: "stretch",
    paddingTop: 10
  },

  topArrowView: {
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 10
  },

  topArrowStyle: {
    margin: 10,
    height: 20,
    width: 20,
    resizeMode: "stretch",
    paddingTop: 10
  },

  topArrowText: {
    color: "#ffffff",
    paddingHorizontal: 10,
    paddingTop: 5,
    fontSize: 20
  },

  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },

  inerLineStyle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingTop: 10
  },

  textInputStyle: {
    height: 45,
    width: "80%",
    color: "#fff",
    fontSize: 15,
    marginVertical: 5,
    borderBottomColor: "#02075d",
    borderBottomWidth: 1
  },

  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#0080ff",
    borderRadius: 30,
    height: 50
  },
  btntext: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    justifyContent: "center"
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 5,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },

  PhoneImageStyle: {
    height: 50,
    width: 40,
    resizeMode: "stretch",
  },

  upperViewContainer: {
    // backgroundColor: "#26477c",
    paddingVertical: 10
  },
  upperViewContainerLine1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent:"flex-start",
    paddingHorizontal: 15,
  },

  UpperInnerLine1: {
    flexDirection: "row",
    //alignItems: 'center',
    // backgroundColor: '#26477c',
    //justifySelf: 'center',
    //paddingHorizontal: 100,    
  },

  AddressStyleLine1: {
    padding: 10,
    height: 40,
    width: 50,
    resizeMode: "stretch",
    //alignItems: "center",
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  TextStyleLine1: {
    color: "#ffffff",
    paddingTop: 1,
    fontSize: 20,
    paddingHorizontal: 8
  },

  upperViewContainerLine2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#fff',
    //backgroundColor: "#0080ff",
    //borderColor: 'rgba(51,154,240,0.1)', borderWidth:1, 
    width: "47.5%",
    borderColor: "#ffffff",
    margin: 5,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 10,
    elevation: 2,
  },

  TopTextInputCross: {
    padding: 6.5,
    margin: 3,
    height: 2,
    width: 2,
    resizeMode: "stretch",
    alignItems: "center"
  },

  container1: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ffffff",
    width: "93%",
    left: "4%",
    borderRadius: 10,
  },

  smallCardStyleAddress: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 15,
    borderRadius: 20
  },

  nametext: {
    paddingHorizontal: 20,
    paddingTop: 10,
    fontSize: 25,
    fontWeight: "bold"
  },

  ButtomTextBox: {
    justifyContent: "flex-start",
    borderWidth: 1,
    width: "70%",
    borderColor: "#e0e5e1",
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 5,
    left: 15,
  },
  requestButtonStyle: {
    // paddingBottom: 15,
    backgroundColor: "rgba(20, 160, 186, 1)",
    borderRadius: 30,
    height: 30,
    width: "100%",
    justifyContent:'center'
  },
  requestBtntext: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    justifyContent: "center"
  },
  mapContainer : {
    // paddingHorizontal: 10,
    width:'100%',
    backgroundColor:'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    // shadowOffset: { width: 1, height: 1, },
    // shadowColor: 'black',
    // shadowOpacity: 0.1,
    
    // position: 'absolute',
    // top: 100,
    // width: '45%',
    // position: 'absolute',
    // right: '3%',
  }
};
