import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Stack, Button, IconComponentProvider} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


const MoneyTrack = () => (

  <Stack spacing={4}>
    <Button 
    tintColor="black" 
    title="Coins: 1000" 
    color="yellow" 
    style={styles.containerG} 
    leading={props => <Icon name="hand-coin" {...props} />}
    /> 
  </Stack>

);


const styles = StyleSheet.create({
  containerG: {
    /*marginTop: 70,   
    marginLeft: -130,
    marginBottom: 40,
    marginRight: 10,*/
    width: 190,
    height: 40,
    
    borderColor: 'black'
    //backgroundColor: 'yellow'
    /*position: 'relative',*/
    /*top: -160,
    left: -40,
    left: -180,
    top: -340,*/
  }

});

export default MoneyTrack;