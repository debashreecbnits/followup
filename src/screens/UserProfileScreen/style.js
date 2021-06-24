import React  from "react";
import { Dimensions, ImageBackground } from 'react-native';
import { UrlTile } from "react-native-maps";

export default {
  container: {
    flex: 1,
    height: "100%"
  },
  menu: {
    height: "20%",
    width: "100%",
    backgroundColor: "#0b2031",
    // ImageBackground : 
  },
  topArrowStyle: {
    margin: 15,
    height: 20,
    width: 20,
    resizeMode: "stretch",
    paddingTop: 10
  },
  profileImageBox: {
    //height: 150,
    //width: 150,
    borderColor: "#d4d4d4",
    //top: 50,
    marginTop:-50,
    //justifyContent:'center',
    alignItems:'center',
    marginBottom:20,
    shadowOffset: {height: 5}, shadowColor: '#339af0', shadowOpacity: 0.3, 
   
  },
  firstBoxTitle : {
    fontSize:25,
    fontWeight:'500',
    margin:15

  },
  containerLower: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 30,
    marginTop:-50,
    paddingHorizontal:'4%'
  },
  overScreenLoding:{ 
    flex: 0, 
    justifyContent: 'center', 
    height: '100%', 
    width: Dimensions.get("window").width,
    position: 'absolute', 
    backgroundColor: 'white', 
    zIndex: 999999999, 
    opacity: 0.5, 
},
followContainer :{
  display:'flex',
  justifyContent:'space-evenly', 
  flexDirection:'row'
},
followBlockBtn :{
  borderRadius: 30,
  marginBottom: 15,
  padding: 10,
  alignItems: 'center',
  backgroundColor: '#74B9FF', 
  width: '30%', 
  shadowColor: 'rgba(255, 255, 255, 1)'
},
accountInfoContainer : {
  flexDirection: "row",
  paddingBottom: 20,
  paddingTop: 20,
  paddingBottom: 10,
  paddingHorizontal: 35,
  width: "100%",
  borderRadius: 20
}
};
