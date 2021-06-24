const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const { height, width } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        display: 'flex',
        alignItems: "center",
        marginVertical: 5,

    },
    card: {
        height: "100%",
        width: "90%",
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: '#fff',
        marginVertical: 15,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        position: 'relative',
    },
    profileImage: {
        height: 60,
        width: 60,
        borderRadius: 100,
        overflow: 'hidden',
        justifyContent: 'center'
    },
    userAction: {
        height: '75%',
        display: 'flex',
        flex: 4,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    userName: {
        color: '#0A79DF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    workInfo: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    mutedBtn: {
        paddingHorizontal: 10,
        fontSize: 10,
        opacity: 0.5
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    accpetBtn: {
        width: '100%',
        backgroundColor: '#74B9FF',
        paddingHorizontal: 15,
        borderRadius: 20, color: '#fff',
        paddingVertical: 2
    },
    declineBtn: {
        width: '100%',
        backgroundColor: '#eee',
        paddingHorizontal: 15,
        borderRadius: 20, color: '#000',
        paddingVertical: 2
    },
    calanderLogo: {
        height: 10,
        width: 10,
    },
    morePng: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    actionToggle: {
        height: 35,
        width: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#74B9FF',
        position: 'absolute',
        top: 30,
        right: 10
    },
    menuPotrait: {
        height: 100,
        width: '100%',
        paddingTop:30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#26477c',
        paddingHorizontal:'2%',
    },
    menuLandscape: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#26477c',
        paddingHorizontal:'2%',
    },
    hamburger: {
        marginHorizontal: 10,
        color: '#339af0'
    },
    actionToggleOuter: {
        position: 'absolute',
        top: 1,
        right: 10
    },
    overScreenLoding: {
        flex: 0,
        justifyContent: 'center',
        height: '100%',
        width: Dimensions.get("window").width,
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 999999999,
        opacity: 0.5,
    },




    containerProfile: {
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
}