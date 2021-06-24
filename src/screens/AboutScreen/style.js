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
        backgroundColor: '#26477c',
    },
    menuLandscape: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#26477c',
    },
    topArrowStyle: {
        margin: 10,
        height: 20,
        width: 20,
        resizeMode: "stretch",
        paddingTop: 10
      },
      hamburger: {
        marginHorizontal: 10,
        color: '#339af0'
    },
}