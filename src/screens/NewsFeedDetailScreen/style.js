import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
    },
    card: {
        flex: 1,
        paddingBottom:20,
        marginVertical: 10,
        marginHorizontal: '5%',
        backgroundColor: '#f2f2f2',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(51,154,240,0.1)',
        borderRadius: 10,
        paddingBottom:100
        //     shadowColor: "rgba(0,0,0,0.1)",
        //     shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        //elevation: 5,
    },
    imageOuterContainer: {
        padding: 10
    },
    image: {
        height: height / 4,
        width: undefined,
        borderRadius: 10,
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
        paddingHorizontal: 10,
        marginVertical: 5
    },
    iconContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 5,
    },
    text: {
        color: '#000',
        opacity: 0.5
    },
    icon: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginTop: 5
    },
    menu: {
        height: 79,
        paddingTop:30,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#26477c',
        paddingHorizontal: '2%'
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
        margin: 15,
        height: 20,
        width: 20,
        resizeMode: "stretch",
        paddingTop: 10
    },
    commentText: {
        marginBottom:10, 
        paddingHorizontal:15, 
        fontSize:16, 
        width: '100%', 
        paddingVertical:10,
        borderRadius:20, 
        backgroundColor:'rgba(0,0,0,0.1)',
        marginTop:20
    },
    sendComment:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:12,
        width:'20%',
        borderRadius: 10,
        height:30,
        backgroundColor: '#0080FF',
        color:'#fff'
    },
    countView: {
        paddingHorizontal:5, 
        paddingVertical:2, 
        marginRight:15, 
        marginLeft:2,  
        backgroundColor:'#1689fc', 
        color:'#fff', 
        borderRadius:5
    }
}