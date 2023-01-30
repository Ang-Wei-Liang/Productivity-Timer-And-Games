import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';



//import DropDown from '../pages/DropDown.js';

import ButtonSign from '../pages/ButtonSignUp.js';
import MoneyTrack from './MoneyTrack.js';

import { useNavigation } from '@react-navigation/native';

import firebase from "firebase/app";
import {auth} from "../firebase";
import "firebase/auth";
import "firebase/firestore";

function TimerScreen(props) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const navigation = useNavigation();
  let interval;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  const restartTimer = () => {
    setSeconds((seconds) => 0);
  }

  var db = firebase.firestore();

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const pad = (n) => (n < 10 ? '0' + n : n);

  const hours = pad(Math.floor(seconds / 3600));
  const minutes = pad(Math.floor((seconds % 3600) / 60));
  const secs = pad(seconds % 60);

  return (
    <>
    
    <View style={styles.container}>
    <View style={styles.bothIcons}>
    <View style={styles.moneyIcon}>
    <MoneyTrack/>

    </View>
    <View style={styles.loginIcon}>
    
    <ButtonSign 
    
    navigation={navigation}
    />
    </View>
    
    
    </View>
    <View style={styles.containerAbsolute}>
    <View style={styles.textContainer}>
    <Text style={styles.text1} >Home</Text>
    <Text style={styles.text2}>Hi {auth.currentUser?.email}! Welcome!</Text>
    </View>
      <Text
        style={{
          fontSize: 60,
          textAlign: 'center'
        }}>
        {`${hours}:${minutes}:${secs}`}
      </Text>
      <TouchableOpacity onPress={toggleTimer} style={styles.startButton}>
        <Text style={styles.startButtonText}>
          {isRunning ? '◼Pause' : '▶Start'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={restartTimer} style={{alignItems: 'center'}}>
        <Text style={styles.startButtonText}>
          {isRunning ? '' : '↻Restart'}
        </Text>
      </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  moneyIcon: {
    marginRight: 100,
     //marginBottom: 600,
     //marginLeft: -150

  },
 loginIcon: {
    //marginTop: 10
    marginTop: -13,
    marginRight: 20
    //marginLeft: 120
  },
  bothIcons: {
    marginTop: -590,
    flexDirection: "row"
    
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    //backgroundColor: '#ecf0f1',
    backgroundColor: 'white',
    padding: 8,
    alignItems: 'center' 
  },
  containerAbsolute: {
    //marginBottom: 200
    position: 'absolute',
    top: 60
  },
  startButton: {
    marginTop: 34,
    backgroundColor: 'lightblue',
    borderRadius: 50,
    paddingVertical: 14, // increase the vertical padding to make the button larger
    paddingHorizontal: 28, // increase the horizontal padding to make the button larger
    margin: 10,
    alignItems: 'center'
  },
  startButtonText: {
    fontSize: 22,
    //alignItems: 'center'  
  },
  text1: {
    fontSize: 23,
    fontWeight: '460'
  },
  text2: {
    fontSize: 16,
  },
  textContainer: {
     marginTop: 110,
     margin: 40,
     position: "relative",
     right: 35,
     padding: 15,
     //backgroundColor: 'whitesmoke',
     borderRadius: 30
  }
});
export default TimerScreen;