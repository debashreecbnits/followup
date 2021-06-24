import React from 'react';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window')

export default {

menuPotrait: {
  height: 100,
  width: '100%',
  paddingTop:30,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#26477c',
},
menuLandscape: {
  height: 70,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#26477c',
  paddingHorizontal: 15,
},
hamburger: {
  marginHorizontal: 10,
  marginLeft:10,
  color: '#339af0'
},
topArrowStyle: {
  margin: 15,
  height: 20,
  width: 20,
  resizeMode: "stretch",
  paddingTop: 10
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
}
}