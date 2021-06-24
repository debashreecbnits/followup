import React from 'react';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window')

export default {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  newsContent: {
    paddingHorizontal: 10
  },
  hambrgerMenu: {
    margin: 16
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#f2f2f2',

    paddingVertical: 10
  },
  imageOuterContainer: {
    padding: 10
  },
  image: {
    height: height / 4,
    width: undefined
  },
  textHeaderOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  textHeaderInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  date: {
    marginHorizontal: 5,
    color: '#000',
    opacity: 0.5
  },
  newsContent: {
    paddingHorizontal: 10
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  icon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  menuPotrait: {
    height: 100,
    width: '100%',
    paddingTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: '#26477c',
    paddingHorizontal:'2%'
},
menuLandscape: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: "flex-start",
    backgroundColor: '#26477c',
    paddingHorizontal: 15,
},

  topArrowStyle: {
    margin: 10,
    height: 20,
    width: 20,
    resizeMode: "stretch",
    paddingTop: 10
  },
  inputContainer: {
    paddingHorizontal: '5%',
    paddingVertical: 20,
    paddingTop: 40,
    paddingBottom:100
  },
  inerLineStyle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    //marginTop: 30,
    backgroundColor: '#fff',
    shadowColor: 'rgba(51, 154, 240, 0.4)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    borderRadius: 10,
    borderColor: 'rgba(51,154,240,0.7)',
    borderWidth: 1
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
  textInputStyle: {
    height: 45,
    width: "90%",
    color: "#000000",
    fontSize: 15,
    marginVertical: 2,
    borderColor: "transparent",
    borderWidth: 1,
    //marginTop: 10,
    paddingLeft: 30,

  },
  ImageStyle1: {
    padding: 10,
    margin: 5,
    height: 5,
    width: 20,
    resizeMode: "stretch",
  },
  SubmitButtonStyle: {
    marginTop: 15,
    paddingTop: 11,
    paddingBottom: 13,
    backgroundColor: "#0080ff",
    borderRadius: 30,
    height: 45,
    width: 140,
    elevation: 2,
  },
  btntext: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    justifyContent: "center"
  },
  error: {
    fontSize: 10,
    color: "red",
    padding: 5
  },
}