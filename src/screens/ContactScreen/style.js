import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default {
  mainContainer: {
    flex: 1
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
    // paddingHorizontal: 20,
    paddingVertical: 100,
    //marginTop: 80
    paddingBottom:200
  },

  textAreaContainer: {
    borderColor: "transparent",
    borderWidth: 1,
    //padding: 5,
    marginTop: 1,
    margin: 10,
    borderRadius: 5,
    paddingLeft:25,
    paddingVertical: 5,
    backgroundColor: '#fff', shadowColor: 'rgba(51, 154, 240, 0.4)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    borderColor: 'rgba(51,154,240,0.7)'

  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    fontSize: 16
  },

  emailArea: {
    height: 40,
    justifyContent: "flex-start"
  },

  inerLineStyle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    paddingTop: 30
  },

  textInputStyle: {
    height: 45,
    width: "90%",
    color: "#fff",
    fontSize: 15,
    marginVertical: 2,
    borderBottomColor: "#02075d",
    borderBottomWidth: 1,
    paddingHorizontal: 40
  },

  SubmitButtonStyle: {
    backgroundColor: "#0080ff",
    borderRadius: 30,
    height: 50,
    width: "50%"
  },
  btntext: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    margin: 10,
    paddingTop: 2
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 5,
    width: 20,
    resizeMode: "stretch",
    position: "absolute",
    bottom: 10
  },
  ImageStyle1: {
    padding: 10,
    margin: 5,
    height: 5,
    width: 20,
    resizeMode: "stretch"
  },

  PhoneImageStyle: {
    height: 50,
    width: 50,
    resizeMode: "stretch"
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
    paddingTop: 5
  },

  UpperInnerLine1: {
    flexDirection: "row",
    paddingHorizontal: 100
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

  menuPotrait: {
    height: 100,
    width: '100%',
    paddingTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#26477c',
    paddingHorizontal:'2%',
    marginBottom:50
},
menuLandscape: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#26477c',
    paddingHorizontal:'2%',
    marginBottom:50
},

  container1: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ffffff",
    width: "93%",
    left: "4%",
    borderRadius: 10
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
    left: 15
  },
  requestButtonStyle: {
    paddingBottom: 15,
    backgroundColor: "#0080ff",
    borderRadius: 30,
    height: 30,
    width: "60%"
  },
  requestBtntext: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    justifyContent: "center"
  },
  error: {
    fontSize: 12,
    color: "red",
    padding:5
  },
  hamburger: {
    marginHorizontal: 10,
    color: '#339af0'
},
};
