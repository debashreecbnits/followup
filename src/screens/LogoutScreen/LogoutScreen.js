import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/loginAction';

const LogoutScreen = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(logout())
        AsyncStorage.removeItem('token')
        .then(() => {
            setTimeout(() => {
             props.navigation.navigate('auth')
            }, 1000);
        })
        .catch(err => console.log(err))
    }, [])

    return(
       <>
       </>
    )
}

export default LogoutScreen;