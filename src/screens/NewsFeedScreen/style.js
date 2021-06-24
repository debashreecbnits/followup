import React from 'react';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window')

export default {
    container: {
        flex: 1
    },
    hambrgerMenu: {
        margin: 16
    },
    card: {
        margin: 10,
        //marginHorizontal: 15,
        //backgroundColor: '#f2f2f2',
        backgroundColor: 'rgba(51,154,240,0.1)',
        //backgroundColor: '#fff',
        padding: 10,
        //paddingVertical: 7,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 0, },
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOpacity: 1.0,
        // borderWidth: 1,
        // borderColor: '#fff',

    },
    imageOuterContainer: {
        padding: 10,
        paddingBottom:0,
        alignItems: 'center',
    },
    image: {
        height: height / 4,
        width: undefined,
        borderRadius: 5,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        // borderWidth: 1,
        // borderColor: '#fff',
        //borderColor: 'rgba(51,154,240,0.5)',
        borderRadius: 10,
        zIndex:9999
    },
    textHeaderOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
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
    menu: {
        height: 100,
        paddingTop:30,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#26477c',
        justifyContent: 'flex-start',
        paddingHorizontal:'2%'
    },

    menuPotrait: {
        height: 100,
        width: '100%',
        paddingTop:30,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#26477c',
        justifyContent: 'flex-start',
        paddingHorizontal:'2%'
    },
    menuLandscape: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#26477c',
        justifyContent: 'flex-start',
        paddingHorizontal:'2%'
    },

    
    topArrowStyle: {
        margin: 10,
        height: 20,
        width: 20,
        resizeMode: "stretch",
        paddingTop: 10
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
    hamburger: {
        marginHorizontal: 10,
        color: '#339af0'
    },
}