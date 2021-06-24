import React from 'react';

export default {
  container: {
    flex: 1,
    height: '100%',
    
  },
  menu: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#26477c',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    // borderBottomLeftRadius: 5,
    // borderBottomRightRadius: 5,
  },
  topArrowStyle: {
    margin: 15,
    height: 20,
    width: 20,
    resizeMode: "stretch",
    paddingTop: 20
  },
  profileImageBox: {
    height: 150,
    width: 150,
    overflow: 'hidden',
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "rgba(51,154,240,1)",    
  },
  requestButtonStyle: {
    // paddingBottom: 15,
    // backgroundColor: "rgba(20, 160, 186, 1)",
    // borderRadius: 30,
    // height: 30,
    // width: "100%",
    // justifyContent:'center',
    // marginTop:25
    marginTop: 25,
    paddingTop: 11,
    paddingBottom: 13,
    backgroundColor: "#0080ff",
    borderRadius: 30,
    height: 45,
    width: 140,
    elevation: 2,
  },
  requestBtntext: {
    // fontSize: 16,
    // color: "#fff",
    // textAlign: "center",
    // justifyContent: "center"
    fontSize: 19,
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: 'bold',
  },
}