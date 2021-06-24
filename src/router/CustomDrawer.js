import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import Config from '../Api/config';

const UserScreen = props => {

  return (
    <View>
      <ScrollView>
        <View
          style={{
            height: props.orientation && props.orientation == 'landscape' ? Dimensions.get('window').height / 3 : Dimensions.get('window').height / 5,
            backgroundColor: '#26477c'
          }}>
          <View style={{
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginRight: 10,
            height: props.orientation && props.orientation == 'landscape' ?
              Dimensions.get("window").height / 3 : Dimensions.get("window").height / 5
          }}>
            <Image
              source={
                props.updatedDetails && props.updatedDetails.profile_picture
                  ?
                  { uri: props.updatedDetails.profile_picture && Config.profileImageUrl + props.updatedDetails.profile_picture }

                  :
                  props.userDetails && props.userDetails.data && props.userDetails.data.profile_picture ? { uri: Config.profileImageUrl + props.userDetails.data.profile_picture }


                    : require('../assets/images/userpic.png')}
              style={styles.profile}
            />
            <Text style={{
              color: '#fff',
              fontWeight: '800',
              marginVertical: 8,
              marginLeft: 50,
              fontSize: props.orientation && props.orientation == 'landscape' ?
                Dimensions.get("window").width / 35 : Dimensions.get("window").width / 25
            }}>{props.userDetails && props.userDetails.data ? `${props.userDetails.data.firstName[0].toUpperCase() + props.userDetails.data.firstName.slice(1)} ${props.userDetails.data.lastName[0].toUpperCase() + props.userDetails.data.lastName.slice(1)}` : 'User'}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <DrawerItemList {...props} />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToprops = state => {
  return {
    userDetails: state.login.strogedetails,
    orientation: state.login.orientation,
    updatedDetails: state.login.updatedUserDetails && state.login.updatedUserDetails ? JSON.parse(state.login.updatedUserDetails) : ''
  }
}

export default connect(mapStateToprops)(UserScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginLeft: '15%',
    marginRight: '5%'
  },
});