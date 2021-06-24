
import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default {

  popupText: {
    margin: 10
    },
  error: {
    fontSize: 10,
    color: "red",
    paddingLeft: 33,
    marginBottom: 15
    },
  radioText: {
    // height: 45,
    // width: "80%",
    color: "#adad85",
    fontSize: 15,
    marginVertical: 5,
    },
  mainContainer: {
    flex: 1,
    backgroundColor: '#0b2031'
  },
  upperView: {
    // height: "25%",
    backgroundColor:'#0b2031'
  },

  topImageStyle: {
    height: "100%",
    width: "100%"
  },

  topLogoViewSignInLanscape: {
    alignItems: "center",
    height: "50%",
    justifyContent: "center",
    paddingTop: 70
  },
  topLogoViewSignInPotrait: {
    alignItems: "center",
    height: "80%",
    justifyContent: "center",
    paddingTop: 30
  },
  topLogoViewSignUp: {
    alignItems: "center",
    height: "80%",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 30
  },

  TopLogoStyleLandscape: {
    padding: 10,
    margin: 5,
    height: 105,
    width: 90,
    resizeMode: "stretch",
    paddingTop: 10
  },
  TopLogoStylePotrait: {
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
    paddingTop: 8,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 7,
    //paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: 120,
    borderRadius: 30,
    marginTop: 10,
    marginLeft: 10,
  },

  topArrowStyle: {
    margin: 10,
    height: 20,
    width: 20,
    resizeMode: "stretch",
    paddingTop: 10
  },

  topArrowText: {
    color: "#339af0",
    paddingHorizontal: 10,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },

  inputContainer: {
    width: '90%',
    marginHorizontal: '5%',
    // paddingHorizontal: 20,
    paddingVertical: 15
  },

  inerLineStyle: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    //paddingTop: 10,
    borderBottomWidth: 1,
    // borderColor: 'transparent',
    borderRadius: 10,
    marginBottom: 5,
    paddingHorizontal: 15,
    // backgroundColor: '#fff', 
    shadowColor: 'rgba(51, 154, 240, 0.4)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    borderBottomColor:'rgba(255,255,255,0.3)'
  },

  textInputStyle: {
    height: 45,
    // width: "90%",
    paddingHorizontal: 10,
    color: "#fff",
    fontSize: 15,
    marginVertical: 5
    //borderBottomColor: "#02075d",
    // borderBottomColor: 'rgba(2, 7, 93, 0.3)',
    // borderBottomWidth: 1
  },

  SubmitButtonStyle: {
    marginTop: 25,
    paddingTop: 11,
    paddingBottom: 13,
    backgroundColor: "#0080ff",
    borderRadius: 30,
    height: 45,
    width: '100%',
    elevation: 2,
    
  },
  btntext: {
    fontSize: 19,
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: 'bold',
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
    backgroundColor: "#26477c",
    paddingVertical: 10
  },
  upperViewContainerLine1: {
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop: 5,
  },

  UpperInnerLine1: {
    flexDirection: "row",
    paddingHorizontal: 100,    
  },

  AddressStyleLine1: {
    padding: 10,
    height: 30,
    width: 5,
    resizeMode: "stretch",
    alignItems: "center"
  },

  TextStyleLine1: {
    color: "#ffffff",
    paddingTop: 1,
    fontSize: 20,
    paddingHorizontal: 8
  },

  upperViewContainerLine2: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0080ff",
    borderWidth: 0.5,
    width: "47.5%",
    borderColor: "#ffffff",
    margin: 5,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 5
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
    justifyContent: "flex-start",
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
  viewContainer:{
    backgroundColor:"red"
  }
};



















