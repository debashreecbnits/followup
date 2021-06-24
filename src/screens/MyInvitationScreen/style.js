const React = require("react-native");
const {Dimensions} = React;

export default {
    container: {
        flex: 1,
        display: 'flex',
        alignItems: "center",
        marginVertical: 3,
    },
    card: {
        height: "90%",
        width: "90%",
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: '#fff',
        marginVertical: 5,
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
        paddingLeft: 15,
    },
    userName: {
        color: '#0A79DF',
        fontSize: 14,
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
        padding:5,
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
        color: '#fff',
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
        width: 10
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
        justifyContent: "flex-start",
        backgroundColor: '#26477c',
        paddingHorizontal:'2%',
    },
    menuLandscape: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
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
}