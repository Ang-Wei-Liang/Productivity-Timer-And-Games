import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Stack, Button, IconComponentProvider} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import firebase from "firebase/app";
import {auth} from "../firebase";
import "firebase/auth";
import "firebase/firestore";

import { forwardRef, useImperativeHandle } from 'react';

const MoneyTrack = forwardRef((props, ref) => { 
  const [coins, setCoins] = useState(100);
//docRef.update({coin: coins})
  useImperativeHandle(ref, () => {
    
    return { setCoins };
  });

  console.log("Now Is" + coins);

  /*function updateCoins(newCoins) {
    docRef.update({coin: newCoins})
  }*/

  useEffect(() => {
    const collectionRef = firebase.firestore().collection("users");
    const docRef = collectionRef.doc(firebase.auth().currentUser.uid);
    docRef.get().then(doc => {
      if (doc.exists) {
        if (doc.data().coin == undefined){
          //setCoins(100);
          console.log("Nah"+coins)
          docRef.update({coin: 200})
        }
        else {
          console.log("storage has" + doc.data().coin)
          setCoins(doc.data().coin);
        }
      }
    });
  }, [coins]);

  const updateCoins = (newCoins) => {
    const collectionRef = firebase.firestore().collection("users");
    const docRef = collectionRef.doc(firebase.auth().currentUser.uid);
    docRef.update({ coin: newCoins });
  }


  /*useEffect(() => {
    console.log("Updating is" + coins);
  }, [coins]);*/
  
  return (
    
    <Stack spacing={4}>
    
      <Button
        tintColor="black"
        title={`Coins: ${coins}`}
        color="yellow"
        style={styles.containerG}
        leading={(props) => <Icon name="hand-coin" {...props} />}
        
      />
      {}
      {console.log("In stack is"+coins)}
    </Stack>
  );
});

const styles = StyleSheet.create({
  containerG: {
    /*marginTop: 70,   
    marginLeft: -130,
    marginBottom: 40,
    marginRight: 10,*/
    width: 190,
    height: 40,

    borderColor: "black",
    //backgroundColor: 'yellow'
    /*position: 'relative',*/
    /*top: -160,
    left: -40,
    left: -180,
    top: -340,*/
  },
});

export default MoneyTrack;
