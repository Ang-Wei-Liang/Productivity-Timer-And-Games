import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Stack, IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
//import { useNavigation } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core'


//import { createStackNavigator } from 'react-navigation-stack';
import SignUpPage from './SignUpPage';
import { auth } from '../firebase'





const ButtonSign = ({navigation}) => {
  //const navigation = useNavigation()
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("SignUp")
      })
      .catch(error => alert(error.message))
  }

    //const navigation = useNavigation();
    return (
        <IconButton   
            navigation={navigation}   
            onPress={handleSignOut}
            icon={(props) => <Icon name="login" {...props} />}
            color="yellow"
            style={styles.containerF}
        />
    );
};

export default ButtonSign;

const styles = StyleSheet.create({
  containerF: {
    backgroundColor: 'black',
  },
});

