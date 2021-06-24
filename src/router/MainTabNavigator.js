import React, { useState, useEffect } from "react";
import { Image, AsyncStorage } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';

import SignUpScreen from '../screens/LoginScreen/SignUpScreen';
import SignInScreen from "../screens/LoginScreen/SignInScreen";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import OtpVerification from "../screens/ForgotPassword/OtpVerification";
import ResetPassword from "../screens/ForgotPassword/ResetPassword";
import ParentMapScreen from "../screens/HomeScreen/ParentMapScreen";
import ContactUs from "../screens/ContactScreen/ContactScreen";
import ChangePassword from "../screens/ChangePasswordScreen/ChangePasswordScreen";
import MyConnection from "../screens/MyConnectionScreen/MyConnectionScreen";
import NewsFeed from "../screens/NewsFeedScreen/NewsFeedScreen";
import NewsFeedDetailScreen from "../screens/NewsFeedDetailScreen/NewsFeedDetailScreen";
import Terms from "../screens/TermsScreen/TermsScreen";
import About from "../screens/AboutScreen/AboutScreen";
import Privacy from "../screens/Privacy/PrivacyScreen";
import Logout from "../screens/LogoutScreen/LogoutScreen";
import Profile from "../screens/ProfileScreen/ProfileScreen";
import UserProfileScreen from "../screens/UserProfileScreen/UserProfileScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Splash from '../screens/SplashScreen/SplashScreen';
import UserDistanceScreen from '../screens/UserDistanceScreen/UserDistanceScreen';
import MainMap from '../screens/HomeScreen/MainMap';
import CreateNewsFeedScreen from '../screens/CreateNewsFeedScreen/CreateNewsFeedScreen';
import InterestListScreen from '../screens/InterestListScreen/InterestListScreen';
import InvitationListScreen from '../screens/MyInvitationScreen/InvitationListScreen';
import SuggestionScreen from '../screens/SuggestionScreen/SuggestionScreen';
import BlockListScreen from '../screens/BlockListScreen/BlockListScreen';
import Connections from '../screens/PotentialConnection/Connections';
import PotentialConnection from '../screens/PotentialConnection/PotentialConnection';
import TopConnection from '../screens/PotentialConnection/TopConnection';
import MyProfileScreen from '../screens/MyProfile/MyProfile';


const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function authStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="SignInScreen"
    >
      <Stack.Screen name="SignInScreen" options={{gestureEnabled:false}} component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="drawer" component={DrawerTab} {...props} />
    </Stack.Navigator>
  )
}

function homeStack(props) {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}
    initialRouteName="ParentMapScreen"
    >
      <Stack.Screen name="ParentMapScreen" component={ParentMapScreen} {...props} options={{ unmountOnBlur:true }}/>
      <Stack.Screen name="Profile" component={UserProfileScreen} {...props}options={{ unmountOnBlur:true }}/>
      <Stack.Screen name="SignInScreen" component={SignInScreen} {...props}/>
      <Stack.Screen name="MapScreen" component={MainMap} {...props}/>
      <Stack.Screen name="UserProfile" component={UserProfileScreen} {...props}options={{ unmountOnBlur:true }}/>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} {...props}options={{ unmountOnBlur:true }}/>
      <Stack.Screen name="MySuggestion" component={SuggestionScreen} {...props}options={{ unmountOnBlur:true }}/>

    </Stack.Navigator>
  )
}

function newsFeedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="NewsFeed" component={NewsFeed} />
      <Stack.Screen name="NewsFeedDetailScreen" component={NewsFeedDetailScreen} />
    </Stack.Navigator>
  )
}

function logoutstack(props) {

  return (
    <Stack.Navigator
      initialRouteName="Logout"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Logout" component={Logout} {...props} />
      <Stack.Screen name="auth" component={authStack} {...props} />
    </Stack.Navigator>
  )
}

function MyConnectionStack(props) {

  return (
    <Stack.Navigator
      initialRouteName="MyConnection"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={homeStack} {...props} options={{ unmountOnBlur:true }}/>
      <Stack.Screen name="MyConnection" component={MyConnection} {...props} />
      <Stack.Screen name="UserDistanceScreen" component={UserDistanceScreen} {...props} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} {...props}options={{ unmountOnBlur:true }}/>
      <Stack.Screen name="Favorites" component={InterestListScreen} {...props} />
      <Stack.Screen name="MyProfile" component={MyProfileScreen} {...props}options={{ unmountOnBlur:true }}/>
      <Stack.Screen name="MySuggestion" component={SuggestionScreen} {...props}options={{ unmountOnBlur:true }}/>


    </Stack.Navigator>
  )
}

function SuggestionStack(props) {

  return (
    <Stack.Navigator
      initialRouteName="MySuggestion"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={homeStack} {...props} options={{ unmountOnBlur:true }}/>
      <Stack.Screen name="UserProfile" component={UserProfileScreen} {...props}options={{ unmountOnBlur:true }}/>
      <Stack.Screen name="MySuggestion" component={SuggestionScreen} {...props}options={{ unmountOnBlur:true }}/>
    </Stack.Navigator>
  )
}

function InterestStack(props) {

  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Favorites" component={InterestListScreen} {...props} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} {...props} options={{ unmountOnBlur:true }}/>

    </Stack.Navigator>
  )
}

function bottomTab() {
  return (
    <BottomTab.Navigator
    tabBarOptions={{
      activeTintColor: '#3C40C6'
    }}
    initialRouteName='Home'
    
    >    
      <BottomTab.Screen name="Suggestions" component={SuggestionStack} options={{ unmountOnBlur:true, tabBarIcon: ({ color }) => <Icon name="group" color={color} size={22} />}}/>
      <BottomTab.Screen name="News Feed" component={newsFeedStack} options={{ tabBarIcon: ({ color }) => <Icon name="newspaper" color={color} size={22} />}}/>
      <BottomTab.Screen name="Home" component={homeStack} options={{ unmountOnBlur:true, tabBarIcon: ({ color }) => 
    
        <Image
          source={require("../assets/images/logo.png")}
          style={{width:20, height:20}}
        />
      }}/>
      <BottomTab.Screen 
        name="Favorites" 
        component={InterestStack} 
        options ={{
          unmountOnBlur:true, 
          tabBarIcon: ({ color }) => <Icon name="heart-outline" color={color} size={22} />
      }}/>
      
      <BottomTab.Screen name="MyProfile" component={MyProfileScreen} options={{ unmountOnBlur:true,title: "Profile", unmountOnBlur:true,tabBarIcon: ({ color }) => <Icon name="account" color={color} size={22} />}}/>
    </BottomTab.Navigator>
  )
}

function DrawerTab() {

  return (

    <Drawer.Navigator
    drawerContent={ props => <CustomDrawer {...props} /> }>
      <Drawer.Screen name="Home" component={bottomTab}
      
      options={{
        title: 'Home',
        drawerIcon: () => <Icon name="home" size={25} color="#26477c"/>
      }}
      />
      <Drawer.Screen name="Profile" component={Profile}
       options={{
        title: 'Edit Profile',
        unmountOnBlur:true,
        drawerIcon: () => <Icon name="account" size={25} color="#26477c"/>
      }}
      />
      <Drawer.Screen name="ChangePassword" component={ChangePassword}
      options={{
        title: 'Change Password',
        drawerIcon: () => <Icon name="key-outline" size={25} color="#26477c"/>
      }}
      />
      <Drawer.Screen name="MyInvitation" component={InvitationListScreen}
        options={{
          title: 'Invitation List',
          unmountOnBlur:true,
          drawerIcon: () => <Icon name="account-plus" size={25} color="#26477c"/>
        }}
      />
      <Drawer.Screen name="MyConnection" component={MyConnectionStack}
      options={{
        title: 'My Connections',
        unmountOnBlur:true,
        drawerIcon: () => <Icon name="transit-connection-variant" size={25} color="#26477c"/>
      }}
      />
      <Drawer.Screen name="MySuggestion" component={SuggestionScreen}
      options={{
        title: 'My Suggestions',
        unmountOnBlur:true,
        drawerIcon: () => <Icon name="group" size={25} color="#26477c"/>
      }}
      />
      <Drawer.Screen name="MyBlockList" component={BlockListScreen}
        options={{
          title: 'My Block Lists',
          unmountOnBlur:true,
          drawerIcon: () => <Icon name="block-helper" size={25} color="#26477c" />
        }}
      />
      <Drawer.Screen name="CreatePost" component={CreateNewsFeedScreen}
      options={{
        unmountOnBlur:true,
        title: 'Create Post',
        drawerIcon: () => <Icon name="pencil-box" size={25} color="#26477c"/>
      }}
      />
      <Drawer.Screen name="About" component={About}
      options={{
        title: 'About',
        drawerIcon: () => <Icon name="information" size={25} color="#26477c"/>
      }}
      />
      <Drawer.Screen name="Terms" component={Terms}
      options={{
        title: 'Terms',
        drawerIcon: () => <Icon name="shield-account" size={25} color="#26477c"/>
      }}
      />
      <Drawer.Screen name="NewsFeed" component={newsFeedStack}
      options={{
        title: 'News Feed',
        drawerIcon: () => <Icon name="newspaper" size={25} color="#26477c"/>
      }}
      />
      <Drawer.Screen name="ContactUs" component={ContactUs}
      options={{
        title: 'Contact Us',
        drawerIcon: () => <Icon name="phone" size={25} color="#26477c"/>
      }}
      />
      <Drawer.Screen name="Logout" component={logoutstack}
      options={{
        title: 'Logout',
        drawerIcon: () => <Icon name="power-standby" size={25} color="#26477c"/>
      }}
      />
    </Drawer.Navigator>
  )
}

function SwitchStack(props) {
  const [token, settoken] = useState({})
  const [spiner, setspiner] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(res => {
        console.log(res)
        settoken(JSON.parse(res))
        setspiner(false)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <Stack.Navigator
      initialRouteName="auth"
      options={{gestureEnabled:false}}
      screenOptions={{
        headerShown: false
      }}
    >
      {
        token && token.ack ? <Stack.Screen name="drawer" component={DrawerTab} {...props} /> : <Stack.Screen options={{gestureEnabled:false}} name="auth" component={authStack} {...props} />
      }

    </Stack.Navigator>
  )
}

export default () => (<NavigationContainer><SwitchStack /></NavigationContainer>);