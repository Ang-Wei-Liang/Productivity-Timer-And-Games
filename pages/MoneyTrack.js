import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Stack, Button, IconComponentProvider} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import firebase from "firebase/app";
import {auth,db} from "../firebase";
import "firebase/auth";
import "firebase/firestore";

import { forwardRef, useImperativeHandle } from 'react';



  
  const MoneyTrack = forwardRef((props, ref) => { 
    const [coins, setCoins] = useState(100);
  //docRef.update({coin: coins})
  
  useImperativeHandle(ref, () => {
    return { setCoins };
  });

  useEffect(() => {
    const collectionRef = db.collection("users");
    const docRef = collectionRef.doc(auth.currentUser.uid);

    let isSubscribed = true;

    docRef.get().then(doc => {
      if (doc.exists) {
        if (doc.data().coin == undefined) {
          setCoins(200);
          console.log("New user, now " + coins + " coins");
          docRef.update({ coin: 200 });
        } else {
          console.log("storage has " + doc.data().coin);
          setCoins(doc.data().coin);
        }
      }
    });

    docRef.onSnapshot(doc => {
      if (isSubscribed) {
        setCoins(doc.data().coin);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);













  //let isSubscribed = true;
  //console.log("Now Is" + coins);

  /*function updateCoins(newCoins) {
    docRef.update({coin: newCoins})
  }*/

  //useEffect(() => {
    //const collectionRef = db.collection("users"); //db is firebase.firestore()
    //const docRef = collectionRef.doc(auth.currentUser.uid);
    //docRef.get().then(doc => {
      //if (doc.exists) {
        //if (doc.data().coin == undefined){
          //setCoins(200);
          //console.log("New user, now"+coins+"coins")
          //docRef.update({coin: 200})
        //}
        //else {
          //console.log("storage has" + doc.data().coin)
          //setCoins(doc.data().coin);
        //}
      //}
    //});
  //}, []);

  //useEffect(() => {
    //const collectionRef = db.collection("users");
    //const docRef = collectionRef.doc(auth.currentUser.uid);
    
    //docRef.onSnapshot(doc => {
      //if (isSubscribed) {
        //setCoins(doc.data().coin);
      //}
    //});
    //return () => {
      //isSubscribed = false;
    //};
  //}, []);

  useEffect(() => {
    const collectionRef = db.collection("users");
    const docRef = collectionRef.doc(auth.currentUser.uid);
    docRef.update({coin: coins});
  }, [coins]);
  
    
  
  return (
    
    <Stack spacing={4}>
    
      <Button
        tintColor="black"
        title={`Coins: ${coins}`}
        color="yellow"
        style={styles.containerG}
        leading={(props) => <Icon name="hand-coin" {...props} />}
        
      />

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
